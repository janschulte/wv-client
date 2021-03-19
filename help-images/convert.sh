#!/bin/bash

rm *.jpg

for f in *.png
do
  echo "Processing $f file... $(echo "$f" | cut -f 1 -d '.')"
  convert $f -quality 50 ../src/assets/images/help/$(echo "$f" | cut -f 1 -d '.').jpg
done