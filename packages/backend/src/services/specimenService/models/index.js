const lookupSpecifications = require('../resources/lookupResources/specification')
const {
  getNormalizedColumnNames,
} = require('common/src/formatObject/specifications')
const loadInitialData = require('./loadInitialData')

const normalizedColumnNames = getNormalizedColumnNames('specimen')

module.exports = [
  {
    loadInitialData,
    modelFactory: 'sequelizeNormalizedDocumentModel',
    name: 'specimen',
    normalizedColumnNames,
  },
  ...lookupSpecifications.map(({ name }) => {
    return {
      modelFactory: 'inMemoryViewDocumentModel',
      name,
    }
  }),
]
