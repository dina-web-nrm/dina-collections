const rootPackageJson = require('../../../../package.json')

module.exports = function getVersionFromRootPackageJson() {
  return rootPackageJson.version
}
