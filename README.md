# rtRemote
rtRemote

Build Instructions for rtRemote (Linux only)

## Building with CMake

1. Build rtCore
   ~~~~
   git clone https://github.com/pxscene/pxCore
   cd pxCore
   mkdir temp
   cd temp
   cmake -DBUILD_RTCORE_LIBS=ON -DBUILD_PXCORE_LIBS=OFF -DBUILD_PXSCENE=OFF ..
   cmake --build .
   ~~~~

   Build libuv (required by uWebSockets)
   ~~~~
   cd pxCore/examples/pxScene2d/external/node/deps/uv
   ./autogen.sh
   ./configure
   make
   ~~~~

   Build uWebSockets
   ~~~~
   cd pxCore/examples/pxScene2d/external/uWebSockets
   cp Makefile.build Makefile
   CFLAGS=" -I../node/deps/uv/include " make
   ~~~~

2. Build rtRemote
   ~~~~
   git clone https://github.com/pxscene/rtRemote.git
   cd rtRemote
   mkdir temp
   cd temp 
   cmake -DRT_INCLUDE_DIR="../pxCore_main/src/" -DUWEBSOCKET_INCLUDE_DIR="../pxCore_main/examples/pxScene2d/external/uWebSockets/src" -DRT_LIBRARY_DIR="../pxCore_main/build/glut/" -DUWEBSOCKET_LIBRARY_DIR="../pxCore_main/examples/pxScene2d/external/uWebSocket" -DBUILD_RTREMOTE_LIBS=ON -DBUILD_RTREMOTE_UNICAST_RESOLVER=ON ..
   cmake --build . --config Release
   ~~~~

   The rtRemote libs will be located in rtRemote

   Additional build configurations for rtRemote are:
   ~~~~
   Build rpcSampleApp: -DBUILD_RTREMOTE_SAMPLE_APP_SHARED=ON
   Build rpcSampleApp_s: -DBUILD_RTREMOTE_SAMPLE_APP_STATIC=ON
   Build rtSampleClient and rtSampleServer: -DBUILD_RTREMOTE_SAMPLE_APP_SIMPLE=ON
   Enable rtRemote debugging: -DENABLE_RTREMOTE_DEBUG=ON
   Enable rtRemote profiling: -DENABLE_RTREMOTE_PROFILE=ON
   Disable librtremote shared library building: -DBUILD_RTREMOTE_SHARED_LIB=OFF
   Disable librtremote static library building: -DBUILD_RTREMOTE_STATIC_LIB=OFF
   ~~~~
