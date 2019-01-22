const path = require('path')
const ensurePathIsRelative = require('./ensurePathIsRelative')

module.exports = function createFullPath({ rootPath, filePath, folderPath }) {
  const fullPath = path.join(rootPath, folderPath, filePath)
  ensurePathIsRelative({ fullPath, rootPath })
  return fullPath
}
