args=()

cd ./data

for f in sample.*; do
  if [ ! -f ${f/sample/} ]
    then
      echo ${f/sample/} 'dont exist'
      exit 1
    fi
    args+=(${f/sample/})



done

rm -f data.zip
zip data.zip ${args[@]}
chmod 777 data.zip

