const mappings = require('./mappings')
const cacheResourcesSpecifications = require('../cacheResourcesSpecifications')

module.exports = [
  {
    mappings,
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
