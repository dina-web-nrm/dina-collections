const loadInitialData = require('./loadInitialData')

module.exports = [
  {
    loadInitialData,
    modelFactory: 'documentModel',
    name: 'agent',
    relations: ['agent'],
  },
]
