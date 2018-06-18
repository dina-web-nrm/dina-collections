const mappingSpecificationMap = require('../resources/searchSpecimen/data/mappings')
const cacheResourcesSpecifications = require('../cacheResourcesSpecifications')

module.exports = [
  {
    mappingSpecificationMap,
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
