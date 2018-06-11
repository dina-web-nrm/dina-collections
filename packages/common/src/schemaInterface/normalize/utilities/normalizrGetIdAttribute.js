module.exports = function getIdAttribute(node) {
  if (node.id) {
    return node.id
  }

  if (node.lid) {
    return node.lid
  }
  return undefined
}
