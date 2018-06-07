const loadInitialData = require('./loadInitialData')

module.exports = [
  {
    loadInitialData,
    modelFactory: 'documentModel',
    name: 'place',
    relations: ['place'],
  },
]
