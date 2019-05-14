args=()

cd ./data

for f in sample.*; do
  if [[ $f == *".sql"* ]]; then
    echo "Not copying file: $f. (dev specific)"
  elif [[ $f == *".index"* ]]; then
    echo "Not copying file: $f. (dev specific)"
  elif [ ! -f ${f/sample/} ]; then
    echo ${f/sample/} 'dont exist'
    exit 1
  else
    args+=(${f/sample/})
  fi
done

rm -f data.zip
zip data.zip ${args[@]}
chmod 777 data.zip

