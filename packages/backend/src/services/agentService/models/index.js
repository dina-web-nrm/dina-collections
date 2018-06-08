const loadInitialData = require('./loadInitialData')

module.exports = [
  {
    loadInitialData,
    modelFactory: 'sequelizeDocumentModel',
    name: 'agent',
    relations: ['agent'],
  },
]
