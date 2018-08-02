module.exports = [
  {
    modelFactory: 'sequelizeDocumentModel',
    name: 'taxon',
    relations: ['taxonName'],
  },
  {
    modelFactory: 'sequelizeDocumentModel',
    name: 'taxonName',
    relations: ['taxon'],
  },
]
