#!/bin/bash
SCRIPT=$(readlink -f "$0")
SCRIPTPATH=$(dirname "$SCRIPT")
cd $SCRIPTPATH
curl -kd "klassen=08c" https://kkst.s.schule-bw.de/homeoffice/ > out.html
node index.js
sleep 20
killall node