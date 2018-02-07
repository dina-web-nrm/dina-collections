const readParameterFromJsonFile = require('./utilities/readParameterFromJsonFile')

module.exports = function readInfo(infoPath) {
  return readParameterFromJsonFile({
    basePath: infoPath,
    markdownFiles: ['description', 'versionInfo'],
    parameterName: 'info',
  })
}
