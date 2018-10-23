while getopts v: option
do
case "${option}"
in
v) VERSION=${OPTARG};;

esac
done

echo $VERSION
