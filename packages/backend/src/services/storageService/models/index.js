const loadInitialData = require('./loadInitialData')

module.exports = [
  {
    modelFactory: 'documentModel',
    name: 'storageLocation',
    relations: ['physicalObject'],
  },
  {
    loadInitialData,
    modelFactory: 'documentModel',
    name: 'physicalObject',
    relations: ['storageLocation'],
  },
]
