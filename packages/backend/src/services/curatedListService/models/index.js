const loadInitialData = require('./loadInitialData')

module.exports = [
  {
    modelFactory: 'documentModel',
    name: 'causeOfDeathType',
  },
  {
    modelFactory: 'documentModel',
    name: 'featureType',
  },
  {
    modelFactory: 'documentModel',
    name: 'preparationType',
  },
  {
    modelFactory: 'documentModel',
    name: 'establishmentMeansType',
  },
  {
    modelFactory: 'documentModel',
    name: 'typeSpecimenType',
  },
  {
    loadInitialData,
    modelFactory: 'documentModel',
    name: 'identifierType',
  },
]
