const mappingSpecification = require('../resources/searchSpecimen/data/mappingSpecification')
const cacheResourcesSpecifications = require('../cacheResourcesSpecifications')

module.exports = [
  {
    mappingSpecification,
    modelFactory: 'elasticsearchDocumentModel',
    name: 'searchSpecimen',
  },

  ...cacheResourcesSpecifications.map(({ name }) => {
    return {
      modelFactory: 'inMemoryViewDocumentModel',
      name,
    }
  }),
]
