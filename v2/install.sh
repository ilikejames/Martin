#!/bin/bash


rm -rf martinAppData/node_modules
rm -rf martinAppCore/node_modules
rm -rf martinAppService/node_modules


cd martinAppData
npm install
cd ../martinAppCore
npm install
cd ../martinAppService
npm intall





