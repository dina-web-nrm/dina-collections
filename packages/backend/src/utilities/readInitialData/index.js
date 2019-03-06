const findRootPath = require('common/src/fs/findRootPath')
const path = require('path')

const dataPath = path.join(findRootPath(), 'data')

const buildInitialDataFileName = (resource, isJson) => {
  if (isJson) {
    return `.${resource}.json`
  }

  return `.${resource}`
}

const buildInitialDataFilePath = (resource, isJson) => {
  return path.join(dataPath, buildInitialDataFileName(resource, isJson))
}

module.exports = function readInitialData(resource, { isJson = true } = {}) {
  const initialDataPath = buildInitialDataFilePath(resource, isJson)
  let data = null
  try {
    data = require(initialDataPath) // eslint-disable-line global-require, import/no-dynamic-require
  } catch (err) {
    console.error('Error loading initial data: ', err) // eslint-disable-line no-console
    data = null
  }
  return data
}
