module.exports = [
  {
    modelFactory: 'sequelizeDocumentModel',
    name: 'storageLocation',
    relations: ['physicalObject'],
  },
  {
    modelFactory: 'sequelizeDocumentModel',
    name: 'physicalObject',
    relations: ['storageLocation'],
  },
]
