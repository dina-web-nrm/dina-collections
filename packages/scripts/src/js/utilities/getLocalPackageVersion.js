const path = require('path')
const getLocalRootFullPath = require('./getLocalRootFullPath')

module.exports = function getLocalPackageVersion() {
  const packageJsonPath = path.join(getLocalRootFullPath(), 'package.json')
  const packageJson = require(packageJsonPath) // eslint-disable-line

  return packageJson.version
}
