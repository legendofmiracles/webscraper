#!/bin/bash

SCRIPT=$(readlink -f "$0")
SCRIPTPATH=$(dirname "$SCRIPT")
cd $SCRIPTPATH
curl -s -d "klassen=08c" --- > out.html
node index.js
wait 20
killall node