#!/bin/sh

##############################
# Usage: ./main.sh NAME ID   #
##############################

DIFF=5

for i in $(seq 1 $DIFF)
do
    DIFF_STR=${DIFF_STR}a
done

name=$1
id=$2
if [ -z $name ]
then
    echo "name?"
    read name
fi

if [ -z $id ]
then
    echo "ID?"
    read id
fi

hash="$(echo -n $name$id | sha1sum)"
hash="$(echo -n $hash | cut -c -40)"

echo "sha1: "$hash

nonce=0
while true
do
    tmph="$(echo -n $hash$nonce | sha1sum)"
    if [ $(echo -n $tmph | cut -c -$DIFF) = $DIFF_STR ]
    then
        echo "nonce: "$nonce
        curl "https://breach.tw/api/search.php?mode=pow&hash=$hash&nonce=$nonce"
        break
    fi
    nonce=$((nonce+1))
done
