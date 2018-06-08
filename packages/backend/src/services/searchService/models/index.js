const cacheResources = require('../cacheResources')

module.exports = [
  {
    modelFactory: 'sequelizeViewDocumentModel',
    name: 'searchSpecimen',
  },

  ...cacheResources.map(({ name }) => {
    return {
      modelFactory: 'inMemoryViewDocumentModel',
      name,
    }
  }),
]
