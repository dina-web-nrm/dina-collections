const cacheResourcesSpecifications = require('../cacheResourcesSpecifications')

module.exports = [
  {
    modelFactory: 'sequelizeViewDocumentModel',
    name: 'searchSpecimen',
  },

  ...cacheResourcesSpecifications.map(({ name }) => {
    return {
      modelFactory: 'inMemoryViewDocumentModel',
      name,
    }
  }),
]
