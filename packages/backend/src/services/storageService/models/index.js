const loadInitialData = require('./loadInitialData')

module.exports = [
  {
    modelFactory: 'sequelizeDocumentModel',
    name: 'storageLocation',
    relations: ['physicalObject'],
  },
  {
    loadInitialData,
    modelFactory: 'sequelizeDocumentModel',
    name: 'physicalObject',
    relations: ['storageLocation'],
  },
]
