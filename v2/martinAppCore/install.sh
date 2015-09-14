#!/bin/bash


cd ../martinAppData/
rm -rf node_modules/

cd ../martinAppCore/
rm -rf node_modules/

cd ../martinAppService/
rm -rf node_modules/


cd ../martinAppData/
npm install
cd ../martinAppCore/
npm install
cd ../martinAppService/
npm install





