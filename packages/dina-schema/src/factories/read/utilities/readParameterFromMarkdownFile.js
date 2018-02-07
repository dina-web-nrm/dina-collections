const fs = require('fs')
const path = require('path')

module.exports = function readParameterFromMarkdownFile(
  basePath,
  parameterName
) {
  const parameterPath = path.join(basePath, `${parameterName}.md`)
  if (fs.existsSync(parameterPath)) {
    return fs.readFileSync(parameterPath, 'utf8')
  }
  return null
}
