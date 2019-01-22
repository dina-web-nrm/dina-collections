echo '{'
echo '"branch":' \"$(git rev-parse --abbrev-ref HEAD)\"\,
echo '"lastTag":' \"$(git describe --abbrev=0)\"\,
echo '"externalIp":' \"$(curl -s ipecho.net/plain;echo)\"\,
if [ -f ./data/.importInfo.json ]
  then
    echo '"importInfo":' $(cat ./data/.importInfo.json)\,
  fi

if [ -f ./data/.info.json ]
  then
    echo '"dataInfo":' $(cat ./data/.info.json)\,
  fi
echo '"hostName":' \"$(hostname)\"
echo '}'
