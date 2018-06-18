const createMappingsFromSpecification = require('../utilities/createMappingsFromSpecification')
const attachMethods = require('./attachMethods')

module.exports = function createModel({
  elasticsearch,
  mappingSpecificationMap,
  name,
  schemaModelName,
  schemaVersion,
}) {
  const mappings = createMappingsFromSpecification({
    mappingSpecificationMap,
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
