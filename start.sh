#!/bin/bash
# Fetching submodules
git submodule init
git submodule update
# Installing node packages
cd www/src/build/Sting/
npm install
cd ../../
node build.js
