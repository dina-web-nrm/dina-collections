const findRootPath = require('../findRootPath')

module.exports = function createFullCmd({ cmd, execFromRoot = true } = {}) {
  if (!cmd) {
    throw new Error('provide cmd')
  }
  return execFromRoot ? `cd ${findRootPath()} && ${cmd}` : cmd
}
