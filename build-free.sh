#! /usr/bin/env bash

# Variables
output_dir=build;

rm -rf $output_dir && 
mkdir $output_dir
cp -r virfice.php $output_dir/
cp -r readme.txt $output_dir/
cp -r src $output_dir/
cp -r vendor $output_dir/
cp -r assets $output_dir/
find $output_dir/assets/css -type f -name "*.min.js" -exec rm {} \;
