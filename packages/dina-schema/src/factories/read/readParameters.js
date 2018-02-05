const readJsonFromDirectory = require('./utilities/readJsonFromDirectory')

module.exports = function readParameters(parametersBasePath) {
  return readJsonFromDirectory({
    directory: parametersBasePath,
  })
}
