cmake_minimum_required(VERSION 2.8)
project(rtremote)

cmake_policy(SET CMP0015 NEW)

set(CMAKE_CXX_STANDARD 11)

set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/out)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/out)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/out)

option(BUILD_SHARED_LIB "BUILD SHARED LIB" ON)
option(BUILD_STATIC_LIB "BUILD STATIC LIB" OFF)
option(BUILD_SAMPLE_APP_SHARED "BUILD SAMPLE APP SHARED" OFF)
option(BUILD_SAMPLE_APP_STATIC "BUILD SAMPLE APP STATIC" OFF)
option(BUILD_SAMPLE_APP_SIMPLE "BUILD SAMPLE APP SIMPLE" OFF)
option(BUILD_UNICAST_RESOLVER "BUILD UNICAST RESOLVER" OFF)
option(ENABLE_DEBUG "ENABLE DEBUG" OFF)
option(ENABLE_PROFILE "ENABLE PROFILE" OFF)

set(RTREMOTE_SOURCE_FILES rtremote.conf.gen rtRemoteConfig.h src/rtRemoteServer.cpp src/rtRemoteObject.cpp
        src/rtRemoteFunction.cpp src/rtRemoteMessage.cpp src/rtRemoteClient.cpp src/rtRemoteValueReader.cpp
        src/rtRemoteValueWriter.cpp src/rtRemoteSocketUtils.cpp src/rtRemoteEnvironment.cpp
        src/rtRemoteObjectCache.cpp src/rtRemote.cpp src/rtRemoteConfig.cpp src/rtRemoteEndPoint.cpp src/rtRemoteFactory.cpp
        src/rtRemoteMulticastResolver.cpp rtRemoteConfigBuilder.cpp src/rtRemoteAsyncHandle.cpp
        src/rtRemoteNet.cpp src/rtRemoteNetCSocket.cpp src/rtRemoteNetWebSocket.cpp src/rtGuid.cpp)

add_definitions(-DRAPIDJSON_HAS_STDSTRING -DRT_PLATFORM_LINUX -DRT_REMOTE_LOOPBACK_ONLY)
include_directories(AFTER ${CMAKE_CURRENT_SOURCE_DIR}/include ${CMAKE_CURRENT_SOURCE_DIR}/external ${CMAKE_CURRENT_SOURCE_DIR}/src ${CMAKE_CURRENT_BINARY_DIR} ${RT_INCLUDE_DIR})

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++0x")

set(LIBRARY_LINKER_OPTIONS -pthread -ldl -luuid -lssl -lz -luv -luWS -luuid -lrtCore -Wl,-rpath=../../,--enable-new-dtags)
set(RTREMOTE_LINK_DIRECTORIES ${CMAKE_CURRENT_SOURCE_DIR} ${RT_LIBRARY_DIR})

if (CMAKE_CROSSCOMPILING OR RTREMOTE_GENERATOR_EXPORT)
    option(RTREMOTE_GENERATOR_EXPORT "Location of rtRemote export file (rtRemoteConfigGen_export.cmake) from a native build" "RTREMOTE_GENERATOR_EXPORT-file-not-found")
    include(${RTREMOTE_GENERATOR_EXPORT})
else(CMAKE_CROSSCOMPILING OR RTREMOTE_GENERATOR_EXPORT)
    add_executable(rtRemoteConfigGen src/rtRemoteConfigGen.cpp)
    set_target_properties(rtRemoteConfigGen PROPERTIES RUNTIME_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}")
    export(TARGETS rtRemoteConfigGen FILE "${CMAKE_CURRENT_BINARY_DIR}/rtRemoteConfigGen_export.cmake")
endif(CMAKE_CROSSCOMPILING OR RTREMOTE_GENERATOR_EXPORT)

add_custom_command(OUTPUT rtremote.conf.gen
                   DEPENDS rtRemoteConfigGen rtremote.conf.ac
                   COMMENT "Generating rtremote.conf.gen"
                   COMMAND rtRemoteConfigGen -i ${CMAKE_CURRENT_SOURCE_DIR}/rtremote.conf.ac -c -o ${CMAKE_CURRENT_BINARY_DIR}/rtremote.conf.gen)

add_custom_command(OUTPUT rtRemoteConfig.h
                   DEPENDS rtRemoteConfigGen rtremote.conf.ac
                   COMMENT "Generating rtRemoteConfig.h"
                   COMMAND rtRemoteConfigGen -i ${CMAKE_CURRENT_SOURCE_DIR}/rtremote.conf.ac -h -o ${CMAKE_CURRENT_BINARY_DIR}/rtRemoteConfig.h)

add_custom_command(OUTPUT rtRemoteConfigBuilder.cpp
                   DEPENDS rtRemoteConfigGen rtremote.conf.ac
                   COMMENT "Generating rtRemoteConfigBuilder.cpp"
                   COMMAND rtRemoteConfigGen -i ${CMAKE_CURRENT_SOURCE_DIR}/rtremote.conf.ac -s -o ${CMAKE_CURRENT_BINARY_DIR}/rtRemoteConfigBuilder.cpp)

add_custom_command(OUTPUT rtremote.conf
                   DEPENDS rtremote.conf.gen
                   COMMAND cp -n rtremote.conf.gen ../out/rtremote.conf)
add_custom_target(run ALL DEPENDS rtremote.conf )

#TARGET rtremote_shared

if (ENABLE_DEBUG)
    message("Enabling rtRemote debug")
    add_definitions(-DRT_RPC_DEBUG -DRT_DEBUG)
    set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -g -O0 -fno-inline")
else()
    set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -O2")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O2")
endif (ENABLE_DEBUG)

if (ENABLE_PROFILE)
    message("Enabling rtRemote profile")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -pg")
endif (ENABLE_PROFILE)

if (BUILD_SHARED_LIB)
    message("Building rtRemote shared lib")
    link_directories(${RTREMOTE_LINK_DIRECTORIES})
    add_library(rtremote_shared SHARED ${RTREMOTE_SOURCE_FILES})
    set_target_properties(rtremote_shared PROPERTIES OUTPUT_NAME "rtRemote")
    target_link_libraries(rtremote_shared ${LIBRARY_LINKER_OPTIONS})
endif (BUILD_SHARED_LIB)

if (BUILD_STATIC_LIB)
    message("Building rtRemote static lib")
    add_library(rtremote_static STATIC ${RTREMOTE_SOURCE_FILES})
    set_target_properties(rtremote_static PROPERTIES OUTPUT_NAME "rtRemote_s")
endif (BUILD_STATIC_LIB)

if (BUILD_SAMPLE_APP_SHARED)
    message ("Building rtRemote sample app using shared library")
    link_directories(${RTREMOTE_LINK_DIRECTORIES})
    add_executable(rtremote_sample_app_shared rtRemoteConfig.h src/rpc_main.cpp)
    set_target_properties(rtremote_sample_app_shared PROPERTIES OUTPUT_NAME "rpcSampleApp")
    target_link_libraries(rtremote_sample_app_shared ${LIBRARY_LINKER_OPTIONS} rtremote_shared )
    target_compile_definitions(rtremote_sample_app_shared PRIVATE RT_PLATFORM_LINUX RAPIDJSON_HAS_STDSTRING)
endif (BUILD_SAMPLE_APP_SHARED)

if (BUILD_SAMPLE_APP_STATIC)
    message ("Building rtRemote sample app using static library")
    link_directories(${RTREMOTE_LINK_DIRECTORIES})
    add_executable(rtremote_sample_app_static rtRemoteConfig.h src/rpc_main.cpp)
    set_target_properties(rtremote_sample_app_static PROPERTIES OUTPUT_NAME "rpcSampleApp_s")
    target_link_libraries(rtremote_sample_app_static ${LIBRARY_LINKER_OPTIONS} rtremote_static)
endif (BUILD_SAMPLE_APP_STATIC)

if (BUILD_SAMPLE_APP_SIMPLE)
    message ("Building rtRemote sample app with client and server")
    link_directories(${RTREMOTE_LINK_DIRECTORIES})
    #client
    add_executable(rtremote_sample_app_client src/rtSampleClient.cpp)
    set_target_properties(rtremote_sample_app_client PROPERTIES OUTPUT_NAME "rtSampleClient")
    target_link_libraries(rtremote_sample_app_client ${LIBRARY_LINKER_OPTIONS} rtremote_shared)
    target_compile_definitions(rtremote_sample_app_client PRIVATE RT_PLATFORM_LINUX RAPIDJSON_HAS_STDSTRING)
    #server
    add_executable(rtremote_sample_app_server src/rtSampleServer.cpp)
    set_target_properties(rtremote_sample_app_server PROPERTIES OUTPUT_NAME "rtSampleServer")
    target_link_libraries(rtremote_sample_app_server ${LIBRARY_LINKER_OPTIONS} rtremote_shared)
    target_compile_definitions(rtremote_sample_app_server PRIVATE RT_PLATFORM_LINUX RAPIDJSON_HAS_STDSTRING)
endif (BUILD_SAMPLE_APP_SIMPLE)

if (BUILD_UNICAST_RESOLVER)
    message ("Building rtRemote unicast resolver")
    link_directories(${RTREMOTE_LINK_DIRECTORIES})
    add_executable(rtremote_unicast_resolver src/rtUnicastResolver.cpp)
    set_target_properties(rtremote_unicast_resolver PROPERTIES OUTPUT_NAME "rtunicastresolverd")
    target_link_libraries(rtremote_unicast_resolver ${LIBRARY_LINKER_OPTIONS} rtremote_shared)
    target_compile_definitions(rtremote_unicast_resolver PRIVATE RT_PLATFORM_LINUX RAPIDJSON_HAS_STDSTRING)
endif (BUILD_UNICAST_RESOLVER)

