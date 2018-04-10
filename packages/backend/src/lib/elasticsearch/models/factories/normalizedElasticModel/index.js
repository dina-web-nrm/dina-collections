const attachMethods = require('./attachMethods')

module.exports = function createModel({
  elasticsearch,
  name,
  normalizedColumnNames = [],
  schemaModelName,
  schemaVersion,
}) {
  const Model = { name, normalizedColumnNames }

  return attachMethods({
    elasticsearch,
    Model,
    schemaModelName,
    schemaVersion,
  })
}
