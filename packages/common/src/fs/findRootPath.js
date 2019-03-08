const fs = require('fs')
const path = require('path')
const findRoot = require('find-root')
const { REPO_ROOT_NAME } = require('../constants/repo')

module.exports = function findRootPath({ startPath: startPathInput } = {}) {
  const startPath = startPathInput || path.join(__dirname, '../../../')
  return findRoot(startPath, dir => {
    const packageJsonPath = path.join(dir, 'package.json')
    const hasPackageJson = fs.existsSync(packageJsonPath)
    if (!hasPackageJson) {
      return false
    }
    /* eslint-disable import/no-dynamic-require, global-require */
    const packageJson = require(packageJsonPath)
    /* eslint-enable import/no-dynamic-require, global-require */
    return packageJson.name === REPO_ROOT_NAME
  })
}
