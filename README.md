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

2. Build libuv (required by uWebSockets)
   ~~~~
   git clone https://github.com/libuv/libuv.git
   cd libuv
   git reset --hard d989902ac658b4323a4f4020446e6f4dc449e25c
   ./autogen.sh
   ./configure
   make
   ~~~~

3. Build uWebSockets
   ~~~~
   git clone https://github.com/uNetworking/uWebSockets.git
   cd uWebSockets
   git checkout v0.14
   git reset --hard 10ab3cd0360c62665bda113cde9e7c81714855ba
   CFLAGS=" -I../libuv/include " make
   ~~~~

4. Build rtRemote
   ~~~~
   git clone https://github.com/pxscene/rtRemote.git
   cd rtRemote
   mkdir temp
   cd temp 
   cmake -DRT_INCLUDE_DIR="../pxCore/src/;../uWebSockets/src" -DRT_LIBRARY_DIR="../pxCore/build/glut/;../uWebSockets;../libuv/.libs" -DBUILD_UNICAST_RESOLVER=ON -DBUILD_SAMPLE_APP_SIMPLE=ON ..
   cmake --build . --config Release
   ~~~~

   The rtRemote libs will be located in rtRemote

   All build configurations for rtRemote:
   ~~~~
   Build rpcSampleApp: -DBUILD_SAMPLE_APP_SHARED=ON
   Build rpcSampleApp_s: -DBUILD_SAMPLE_APP_STATIC=ON
   Build rtSampleClient and rtSampleServer: -DBUILD_SAMPLE_APP_SIMPLE=ON
   Build rtunicastresolverd: -DBUILD_UNICAST_RESOLVER=ON
   Enable rtRemote debugging: -DENABLE_DEBUG=ON
   Enable rtRemote profiling: -DENABLE_PROFILE=ON
   Disable librtremote shared library building: -DBUILD_SHARED_LIB=OFF
   Disable librtremote static library building: -DBUILD_STATIC_LIB=OFF
   ~~~~
