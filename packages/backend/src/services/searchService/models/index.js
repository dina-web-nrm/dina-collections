const cacheResources = require('../cacheResources')

module.exports = [
  {
    modelFactory: 'sequelizeDocumentModel',
    name: 'stageSpecimen',
  },
  {
    modelFactory: 'sequelizeDocumentModel',
    name: 'searchSpecimen',
  },

  ...cacheResources.map(({ name }) => {
    return {
      modelFactory: 'inMemoryViewDocumentModel',
      name,
    }
  }),
]
