const fs = require('fs')
const path = require('path')
const findRoot = require('find-root')
const { REPO_ROOT_NAME } = require('../constants/repo')

module.exports = function findRootPath({
  startPath: startPathInput,
  throwError = true,
} = {}) {
  const startPath = startPathInput || path.join(__dirname, '../../../')
  let rootPath = ''
  try {
    rootPath = findRoot(startPath, dir => {
      if (!dir) {
        return false
      }
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
  } catch (err) {
    if (throwError) {
      throw err
    }
  }
  return rootPath
}
