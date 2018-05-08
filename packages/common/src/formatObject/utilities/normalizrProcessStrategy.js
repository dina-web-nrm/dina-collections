const createLid = require('./createLid')

module.exports = function processStrategy(node) {
  if (node.id || node.lid) {
    return node
  }
  node.lid = createLid() // eslint-disable-line no-param-reassign
  return node
}
