const cacheResourcesSpecifications = require('../cacheResourcesSpecifications')

module.exports = [
  {
    modelFactory: 'inMemoryViewDocumentModel',
    name: 'searchSpecimen',
  },

  ...cacheResourcesSpecifications.map(({ name }) => {
    return {
      modelFactory: 'inMemoryViewDocumentModel',
      name,
    }
  }),
]
