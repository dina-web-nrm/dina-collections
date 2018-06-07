const loadInitialData = require('./loadInitialData')

module.exports = [
  {
    modelFactory: 'documentModel',
    name: 'taxon',
    relations: ['taxonName'],
  },
  {
    loadInitialData,
    modelFactory: 'documentModel',
    name: 'taxonName',
    relations: ['taxon'],
  },
]
