const lookupSpecifications = require('../resources/lookupResources/specification')
const {
  getNormalizedColumnNames,
} = require('common/src/formatObject/specifications')

const normalizedColumnNames = getNormalizedColumnNames('specimen')

module.exports = [
  {
    modelFactory: 'sequelizeNormalizedDocumentModel',
    name: 'specimen',
    normalizedColumnNames,
  },
  ...lookupSpecifications.map(({ name }) => {
    return {
      modelFactory: 'inMemoryViewDocumentModel',
      name,
      validate: false,
    }
  }),
]
