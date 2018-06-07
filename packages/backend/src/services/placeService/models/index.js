const loadInitialData = require('./loadInitialData')

module.exports = [
  {
    loadInitialData,
    modelFactory: 'sequelizeDocumentModel',
    name: 'place',
    relations: ['place'],
  },
]
