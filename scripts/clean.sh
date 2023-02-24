#!/bin/bash -uxe

GREEN=`tput setaf 2`
NC=`tput sgr0`

arr=("node_modules" "build" "dist" ".svelte-kit" ".turbo")

for folder in "${arr[@]}"
do
  total=$(find . -name "${folder}" -type d -prune -not -path "./.bin/*" -exec du -ch {} + | grep total$)
  echo "${GREEN} deleting ${folder} ($total)...${NC}"
  find . -name "${folder}" -type d -prune -not -path "./.bin/*" -exec echo '{}' \; -exec mkdir -p ./.bin/'{}' \; -exec rmdir ./.bin/'{}' \; -exec mv -i '{}' ./.bin/'{}' \;
  echo
done

