#!/bin/sh

g++ -std=c++17 ./index.cpp ./src/sha1/sha1.cpp -o ./index.o
chmod +x ./index.o
./index.o