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

zip data.zip ${args[@]}

