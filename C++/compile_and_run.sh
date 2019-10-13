#!/bin/sh

clang++ -std=c++17 ./index.cpp ./src/sha1/sha1.cpp -o ./index.o -lssl -lcrypto
chmod +x ./index.o
./index.o