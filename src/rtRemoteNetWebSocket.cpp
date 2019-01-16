/*

pxCore Copyright 2005-2018 John Robinson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

#include "rtRemoteNetWebSocket.h"
#include "rtRemoteSocketUtils.h"
#include "rtRemoteMessage.h"
#include "rtRemoteEnvironment.h"
#include "rtRemoteConfig.h"
#include <rapidjson/stringbuffer.h>
#include <rapidjson/writer.h>
#include <queue>

extern rtRemoteEnvironment* gEnv;

rtError handleMessage(char* message, size_t length, void* userData)
{
  char* tmp = new char[length+1];
  strncpy(tmp, message, length);
  tmp[length] = 0;
  rtLogDebug("websocket message: %s", tmp);
  rtRemoteWebSocket* socket = static_cast< rtRemoteWebSocket* >(userData);
  rtRemoteMessagePtr doc = nullptr;
  rtError e = rtParseMessage(tmp, (int)length, doc);
  if(e == RT_OK)
  {
    e = socket->onMessage(doc);
  }
  if (e != RT_OK)
  {
    //TODO cleanup the socket
    rtLogWarn("error dispatching message. %s", rtStrError(e));
    //m_streams[i].reset();
    //s.reset();
  }
  delete [] tmp;
  return e;
}

/*****************************************************************************************
 * 
 * rtRemoteWebSocketClient
 *
*****************************************************************************************/

class rtRemoteWebSocketClient : public rtRemoteNetThread
{
public:
  static rtRemoteWebSocketClient* instance()
  {
    static rtRemoteWebSocketClient* pinstance = nullptr;
    if(!pinstance)
    {
      pinstance = new rtRemoteWebSocketClient();
      pinstance->start();
    }
    return pinstance;
  }
  rtError start();
  void connect(rtRemoteAddress* remoteAddress, rtRemoteWebSocket* socket);
  void connectNext();
protected:
  void onThreadRun() override;
private:
  std::queue<std::pair<std::string, rtRemoteWebSocket*> > m_connQueue;
  uWS::Hub m_hub;
  uS::Async* m_asyncConnect;
};

void connectNext2()
{
  rtRemoteWebSocketClient::instance()->connectNext();
}

rtError rtRemoteWebSocketClient::start()
{
  if(isThreadRunning())
  {
    rtLogDebug("client already started\n");
    return RT_ERROR;
  }
  startThread();

  m_hub.onConnection([this](uWS::WebSocket<uWS::CLIENT> *ws, uWS::HttpRequest req) {
      rtLogDebug("websocket connect\n");
      rtRemoteWebSocket* socket = (rtRemoteWebSocket*)ws->getUserData();
      socket->m_clientSocket = ws;
  });

  m_hub.onDisconnection([this](uWS::WebSocket<uWS::CLIENT> *ws, int code, char *message, size_t length) {
      rtLogDebug("websocket disconnect\n");
  });

  m_hub.onMessage([this](uWS::WebSocket<uWS::CLIENT> *ws, char *message, size_t length, uWS::OpCode opCode) {
      handleMessage(message, length, ws->getUserData());
  });
  m_asyncConnect = new uS::Async(m_hub.getLoop());
  m_asyncConnect->start([](uS::Async *a) {
      rtLogDebug("Async connect\n");
      connectNext2();
  });
  rtLogDebug("client start ok\n");
  return RT_OK;
}

void rtRemoteWebSocketClient::connect(rtRemoteAddress* remoteEndPoint, rtRemoteWebSocket* socket)
{
  rtRemoteSocketAddress* sockAddr = dynamic_cast<rtRemoteSocketAddress*>(remoteEndPoint);
  char uri[100];//TODO size matters
  sprintf(uri, "ws://%s:%d", sockAddr->getHost().c_str(), sockAddr->getPort());
  m_connQueue.push(std::make_pair(uri, socket));
  m_asyncConnect->send();
}

void rtRemoteWebSocketClient::connectNext()
{
  if(!m_connQueue.empty())
  {
    std::pair<std::string, rtRemoteWebSocket*> p = m_connQueue.front();
    m_connQueue.pop();
    rtLogDebug("connecting to %s\n", p.first.c_str());
    m_hub.connect(p.first, (void*)p.second);
  }
  
}

void rtRemoteWebSocketClient::onThreadRun()
{
  rtLogDebug("client hub thread running\n");
  m_hub.run();
}


/*****************************************************************************************
 * 
 * rtRemoteWebSocketServer
 *
*****************************************************************************************/

rtRemoteWebSocketServer::rtRemoteWebSocketServer()
{
}

rtRemoteWebSocketServer::~rtRemoteWebSocketServer()
{
  stop();
}

rtError rtRemoteWebSocketServer::start(std::shared_ptr<rtRemoteSocketServerListener> listener, int port, const char* host)
{
  rtLogDebug("WebSocket server starting\n");

  if(isThreadRunning())
  {
    rtLogError("rtRemoteSocketServer already started.");
    return RT_ERROR;
  }
  m_listener = listener;

  if(port == 0)
  {
    port = gEnv->Config->websocket_server_listen_port();
  }

  std::string sHost;
  if(host != nullptr)
    sHost = host;

  if(sHost.empty())
  {
    rtLogDebug("WebSocket parsing interface=%s", gEnv->Config->websocket_server_listen_interface().c_str());

    if (gEnv->Config->websocket_server_listen_interface() != "lo")
    {
      sockaddr_storage ss;
      rtError e = rtParseAddress(ss, gEnv->Config->websocket_server_listen_interface().c_str(), port, nullptr);
      if (e == RT_OK)
      {
        std::shared_ptr<rtRemoteSocketAddress> addr = rtRemoteSocketAddress::fromSockAddr("ws", ss);
        sHost = addr->getHost();
        rtLogDebug("WebSocket parsed host=%s", sHost.c_str());
      }
      else
      {
        rtLogError("Failed to parse websocket_server_listen_interface=%s", gEnv->Config->websocket_server_listen_interface().c_str());
      }
    }
  }

  rtLogDebug("WebSocket server attempt to listen at host %s on port %d\n", sHost.empty() ? "localhost" : sHost.c_str(), port);

  if(!m_hub.listen(sHost.empty() ? nullptr : sHost.c_str(), port))
  {
    rtLogWarn("WebSocket server failed to listen at host %s on port %d\n", sHost.empty() ? "localhost" : sHost.c_str(), port);
    return RT_ERROR;
  }

  rtLogDebug("WebSocket listening at ws://%s:%d\n", sHost.empty() ? "localhost" : sHost.c_str(), port);

  m_hub.onConnection([this](uWS::WebSocket<uWS::SERVER> *ws, uWS::HttpRequest req) {
      rtLogDebug("websocket connect\n");

      //
      // Create first instance of socket shared pointer. 
      // All other shared pointers should come from this one.
      //
      std::shared_ptr<rtRemoteWebSocket> socket = std::make_shared<rtRemoteWebSocket>();

      socket->accept(ws);

      connectSocket(socket, this);

      //stash a handle to quickly find later
      ws->setUserData(socket.get());
  });

  m_hub.onDisconnection([this](uWS::WebSocket<uWS::SERVER> *ws, int code, char *message, size_t length) {
      rtLogDebug("websocket disconnect\n");

      rtRemoteWebSocket* socket = static_cast< rtRemoteWebSocket* >(ws->getUserData());
      disconnectSocket(socket);
  });

  m_hub.onMessage([this](uWS::WebSocket<uWS::SERVER> *ws, char *message, size_t length, uWS::OpCode opCode) {
      handleMessage(message, length, ws->getUserData());
  });

  a = new uS::Async(m_hub.getLoop());
  a->start([](uS::Async *a) {
      printf("Async close\n");
      a->close();
  });

  m_address = std::make_shared<rtRemoteSocketAddress>(sHost.empty() ? "localhost" : sHost.c_str(), port, "ws");

  rtLogDebug("server onStart address=%s\n", m_address->toString().c_str());

  startThread();
  return RT_OK;
}

rtError rtRemoteWebSocketServer::stop()
{
  a->send();
  stopThread();
}

void rtRemoteWebSocketServer::onThreadRun()
{
  printf("server hub running\n");
  m_hub.run();
}


/*****************************************************************************************
 * 
 * rtRemoteWebSocket
 *
*****************************************************************************************/

rtRemoteWebSocket::rtRemoteWebSocket()
: rtRemoteSocket(),
  m_serverSocket(NULL),
  m_clientSocket(NULL)
{
}
/*
rtRemoteWebSocket::rtRemoteWebSocket(uWS::WebSocket<uWS::CLIENT>* s)
: rtRemoteSocket(),
  m_serverSocket(NULL),
  m_clientSocket(s)
{
}
*/
rtRemoteWebSocket::~rtRemoteWebSocket()
{
}

rtError rtRemoteWebSocket::connect(rtRemoteAddress* remoteAddress)
{
  if(isConnected())
  {
    disconnect();
  }

  rtRemoteWebSocketClient::instance()->connect(remoteAddress, this);

  while(m_clientSocket == 0)
    usleep(100);//TODO WMR fix this clunky thing.  need to also know connect failure error

  return RT_OK;
}

rtError rtRemoteWebSocket::accept(uWS::WebSocket<uWS::SERVER>* s)
{
  m_serverSocket = s;
}

rtError rtRemoteWebSocket::disconnect()
{
  return RT_OK;
}

bool rtRemoteWebSocket::isConnected()
{
  return m_clientSocket || m_serverSocket;
}

rtError rtRemoteWebSocket::send(const char *message, size_t length)
{
  if(m_serverSocket)
    m_serverSocket->send(message, length, uWS::OpCode::TEXT);
  else if(m_clientSocket)
    m_clientSocket->send(message, length, uWS::OpCode::TEXT);
  return RT_OK;//TODO WMR check errors
}

rtError rtRemoteWebSocket::send(rtRemoteMessagePtr const& msg)
{
  rapidjson::StringBuffer buff;
  rapidjson::Writer<rapidjson::StringBuffer> writer(buff);
  msg->Accept(writer);
  if(m_serverSocket)
    m_serverSocket->send(buff.GetString(), buff.GetSize(), uWS::OpCode::TEXT);
  else if(m_clientSocket)
    m_clientSocket->send(buff.GetString(), buff.GetSize(), uWS::OpCode::TEXT);
  return RT_OK;//TODO WMR check errors
}


/*****************************************************************************************
 * 
 * rtRemoteWebSocketFactory
 *
*****************************************************************************************/

std::shared_ptr<rtRemoteSocket> rtRemoteWebSocketFactory::createSocket()
{
  TRACE_FUNC
  return std::static_pointer_cast<rtRemoteSocket>(std::make_shared<rtRemoteWebSocket>());
}

std::shared_ptr<rtRemoteSocketServer> rtRemoteWebSocketFactory::createServer()
{
  TRACE_FUNC
  return std::static_pointer_cast<rtRemoteSocketServer>(std::make_shared<rtRemoteWebSocketServer>());
}

