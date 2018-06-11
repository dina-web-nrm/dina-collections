const nestedToCoreSync = require('./nestedToCoreSync')

module.exports = function nestedToCore({
  extractRelationships = true,
  formatRelationships = true,
  item: rawItem,
  normalize = true,
  type: resourceType,
}) {
  return Promise.resolve().then(() => {
    return nestedToCoreSync({
      extractRelationships,
      formatRelationships,
      item: rawItem,
      normalize,
      type: resourceType,
    })
  })
}
