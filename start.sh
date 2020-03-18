#!/bin/bash

SCRIPT=$(readlink -f "$0")
SCRIPTPATH=$(dirname "$SCRIPT")
cd $SCRIPTPATH
curl -s -d "klassen=08c" http://kkst.s.schule-bw.de/homeoffice/ > out.html
node index.js
wait 20
killall node