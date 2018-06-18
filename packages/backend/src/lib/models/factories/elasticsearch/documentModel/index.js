const attachMethods = require('./attachMethods')

module.exports = function createModel({
  elasticsearch,
  mappings,
  name,
  schemaModelName,
  schemaVersion,
}) {
  const Model = {
    index: name.toLowerCase(),
    mappings,
    name,
  }

  return attachMethods({
    elasticsearch,
    Model,
    schemaModelName,
    schemaVersion,
  })
}
