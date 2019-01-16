args=()

cd ./data

for f in sample.*; do
    args+=(${f/sample/})
done

zip data.zip ${args[@]}

