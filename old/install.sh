#!/bin/bash
ORANGE='\033[0;33m'
NC='\033[0m'


printf "\n\n${ORANGE}martinAppData${NC} -- reinstalling node modules\n" && 
cd martinAppData/ && 
rm -rf node_modules/ &&
npm install &&

printf "\n\n${ORANGE}martinAppCore${NC} -- reinstalling node modules\n" &&
cd ../martinAppCore/ &&
rm -rf node_modules/ &&
npm install	&&

printf "\n\n${ORANGE}martinAppService${NC} -- reinstalling node modules\n" &&
cd ../martinAppService/ &&
rm -rf node_modules/ &&
npm install

printf "\n\n${ORANGE}martinAppWeb${NC} -- reinstalling node modules\n" &&
cd ../martinAppWeb/ &&
rm -rf node_modules/ &&
npm install






