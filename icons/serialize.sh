#!/bin/bash

# Create a directory if it does not exist
data_dir=icons/data
mkdir $data_dir

icons_json=${data_dir}/svg_files.json

icons_dir=src/assets/icons

echo -n '{ "svg_files": [ ' > $icons_json

file_count=$(ls $icons_dir | grep -e '|*.svg' | wc -l)

count=0
for entry in $(ls $icons_dir | grep -e '|*.svg')
do

  if [[ $count -eq $(($file_count-1)) ]]
  then
    echo -n '"'${entry%%.*}'" ' >> $icons_json
  else
    echo -n '"'${entry%%.*}'", ' >> $icons_json
  fi
  count=$(($count+1))
done

echo -n '] }' >> $icons_json
