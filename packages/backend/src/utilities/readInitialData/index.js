const path = require('path')

const relativeRootPath = '../../../../../'
const dataPath = path.join(__dirname, relativeRootPath, 'data')

const buildInitialDataFileName = resource => {
  return `.${resource}.json`
}

const buildInitialDataFilePath = resource => {
  return path.join(dataPath, buildInitialDataFileName(resource))
}

module.exports = function readInitialData(resource) {
  const initialDataPath = buildInitialDataFilePath(resource)
  let data = null
  try {
    data = require(initialDataPath) // eslint-disable-line global-require, import/no-dynamic-require
  } catch (err) {
    console.error('Error loading initial data: ', err) // eslint-disable-line no-console
    data = null
  }
  return data
}
