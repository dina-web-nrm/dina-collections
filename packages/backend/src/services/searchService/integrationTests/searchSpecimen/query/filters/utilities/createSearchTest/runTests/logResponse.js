module.exports = function logResponse(res) {
  /* eslint-disable no-console */
  console.log(JSON.stringify(res, null, 2))
  /* eslint-enable no-console */
}
