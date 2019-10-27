@echo off
g++ ./index.cpp ./src/sha1/sha1.cpp -o ./index.exe -g -Wall -static -pthread -std=c++17 -Wl,--allow-multiple-definition -lwsock32 -lssl -lcrypto -lws2_32
./index.exe
