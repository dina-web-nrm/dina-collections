module.exports = function ensurePathIsRelative({ rootPath, fullPath }) {
  if (!fullPath.includes(rootPath)) {
    throw new Error('Not allowed path')
  }
}
