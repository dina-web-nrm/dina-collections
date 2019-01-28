const nestedToCoreSync = require('./nestedToCoreSync')

module.exports = function nestedToCore({
  extractRelationships = true,
  formatRelationships = true,
  item: rawItem,
  normalize = true,
  stripRelationships,
  type: resourceType,
}) {
  return Promise.resolve().then(() => {
    return nestedToCoreSync({
      extractRelationships,
      formatRelationships,
      item: rawItem,
      normalize,
      stripRelationships,
      type: resourceType,
    })
  })
}
