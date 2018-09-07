const path = require('path')
const ensurePathIsRelative = require('./ensurePathIsRelative')

module.exports = function createFullPath({ rootPath, filePath }) {
  const fullPath = path.join(rootPath, filePath)
  ensurePathIsRelative({ fullPath, rootPath })
  return fullPath
}
