const uuidv1 = require('uuid/v4')

module.exports = function processStrategy(node) {
  if (node.id || node.lid) {
    return node
  }
  node.lid = uuidv1() // eslint-disable-line no-param-reassign
  return node
}
