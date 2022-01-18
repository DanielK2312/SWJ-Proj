#!/usr/bin/env bash

# god_mode.sh
# Author: Gabe Hoban (1/17/22)
# 
# Evil script to bypass bitbucket commit

# Not building my broken version
docker build -t swj-capstone-staging . &&\
	heroku container:push web -a swj-capstone-staging &&\
	 heroku container:release web -a swj-capstone-staging

echo ""
echo "Let no-one see my aweful code until it is finished :)"
echo ""
echo "**insert evil laugh here**"
echo ""
echo ""
echo "**runs away after hearing more evil laughs nearby**"
echo ""
echo "Oh god... i'm not the only one"
echo "Bye - please delete me"
