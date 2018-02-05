const readJsonFromDirectory = require('./utilities/readJsonFromDirectory')

module.exports = function readApis(apisBasePath) {
  return readJsonFromDirectory({ directory: apisBasePath })
}
