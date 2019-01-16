echo '{'
echo '"branch":' \"$(git rev-parse --abbrev-ref HEAD)\"\,
echo '"lastTag":' \"$(git describe --abbrev=0)\"\,
echo '"externalIp":' \"$(curl -s ipecho.net/plain;echo)\"\,
echo '"hostName":' \"$(hostname)\"
echo '}'
