

while getopts u:v: option
do
case "${option}"
in
u) USER=${OPTARG};;
v) VERSION=${OPTARG};;

esac
done

echo $USER
echo $VERSION
uname -n