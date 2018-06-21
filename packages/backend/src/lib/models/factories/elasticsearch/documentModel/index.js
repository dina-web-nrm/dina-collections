const createMappingsFromSpecification = require('../utilities/createMappingsFromSpecification')
const attachMethods = require('./attachMethods')

module.exports = function createModel({
  elasticsearch,
  mappingSpecification,
  name,
  schemaModelName,
  schemaVersion,
}) {
  const mappings = createMappingsFromSpecification({
    mappingSpecification,
    name,
  })

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
