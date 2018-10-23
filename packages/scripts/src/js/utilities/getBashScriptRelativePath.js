const path = require('path')

module.exports = function getLocalBashScriptRelativePath(scriptName) {
  return path.join('./packages/scripts/src/bash/', scriptName)
}
