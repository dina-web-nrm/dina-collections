const createMappingsFromSpecification = require('../utilities/createMappingsFromSpecification')
const setupMethods = require('./setupMethods')

module.exports = function createModel({
  elasticsearch,
  forceRefresh = false,
  mappingSpecification,
  name,
  schemaModelName,
  schemaVersion,
}) {
  const mappings =
    (mappingSpecification &&
      createMappingsFromSpecification({
        mappingSpecification,
        name,
      })) ||
    undefined

  const Model = {
    index: name.toLowerCase(),
    mappings,
    name,
  }

  const methods = setupMethods({
    elasticsearch,
    forceRefresh,
    Model,
    schemaModelName,
    schemaVersion,
  })

  return { modelType: 'elasticsearchDocumentModel', name, ...methods }
}
