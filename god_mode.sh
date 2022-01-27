#!/usr/bin/env bash

# god_mode.sh
# Author: Gabe Hoban (1/17/22)
# 
# Evil script to bypass bitbucket commit

Red='\033[0;31m'          # Red
Green='\033[0;32m'        # Green
BPurple='\033[1;35m'      # Bold Purple
Color_Off='\033[0m'       # Text Reset

# Not building my broken version
docker build -t swj-capstone-staging . 
echo -e "[1/3] ${Green}Docker built image successfully.${Color_Off}"
heroku container:push web -a swj-capstone-staging  
echo -e "[2/3] ${Green}Heroku uploaded image successfully.${Color_Off}"
heroku container:release web -a swj-capstone-staging 
echo -e "[3/3] ${Green}Heroku uploaded image successfully.${Color_Off}"

echo ""
echo "Let no-one see my aweful code until it is finished :)"
echo ""
echo -e "${BPurple}**insert evil laugh here**${Color_Off}"
echo ""
echo ""
echo "**runs away after hearing more evil laughs nearby**"
echo ""
echo "Oh god... i'm not the only one"
