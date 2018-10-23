

while getopts i:v: option
do
case "${option}"
in
i) INPUT=${OPTARG};;
v) VERSION=${OPTARG};;

esac
done

echo $INPUT
echo $VERSION
uname -n