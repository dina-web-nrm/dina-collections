const loadInitialData = require('./loadInitialData')

module.exports = [
  {
    modelFactory: 'sequelizeDocumentModel',
    name: 'taxon',
    relations: ['taxonName'],
  },
  {
    loadInitialData,
    modelFactory: 'sequelizeDocumentModel',
    name: 'taxonName',
    relations: ['taxon'],
  },
]
