const path = require('path')
const findRootPath = require('../fs/findRootPath')

module.exports = function getEnvFilePath({ envFileName }) {
  let rootPath
  try {
    rootPath = findRootPath()
  } catch (err) {
    /* eslint-disable no-console */
    console.warn('Could not find rootPath')
    /* eslint-enable no-console */
  }

  if (!rootPath) {
    return undefined
  }

  return path.join(rootPath, 'env', envFileName)
}
