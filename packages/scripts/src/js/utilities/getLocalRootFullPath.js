const path = require('path')

const relativeRootPath = '../../../../../'

module.exports = function getLocalRootFullPath() {
  return path.join(__dirname, relativeRootPath)
}
