const path = require('path')
const findRootPath = require('../fs/findRootPath')

module.exports = function getEnvFilePath({ envFileName, throwError }) {
  let rootPath
  try {
    rootPath = findRootPath({ throwError })
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
