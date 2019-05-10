const createMappingsFromSpecification = require('../utilities/createMappingsFromSpecification')
const setupMethods = require('./setupMethods')

module.exports = function createModel({
  elasticsearch,
  forceRefresh = false,
  mappingSpecification,
  name,
  rebuildStrategy = 'replace',
  schemaModelName,
}) {
  const mappings =
    (mappingSpecification &&
      createMappingsFromSpecification({
        mappingSpecification,
        name,
      })) ||
    undefined

  const settings = {
    analysis: {
      normalizer: {
        lowerCaseNormalizer: {
          filter: ['lowercase'],
          type: 'custom',
        },
        trimNormalizer: {
          filter: ['trim'],
          type: 'custom',
        },
      },
    },
  }

  const Model = {
    index: name.toLowerCase(),
    indexSettings: settings,
    mappings,
    name,
  }

  const methods = setupMethods({
    elasticsearch,
    forceRefresh,
    Model,
    rebuildStrategy,
    schemaModelName,
  })

  return {
    modelType: 'elasticsearchDocumentModel',
    name,
    ...methods,
  }
}
