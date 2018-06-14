const {
  getNormalizedColumnNames,
} = require('common/src/formatObject/specifications')
const loadInitialData = require('./loadInitialData')

const normalizedColumnNames = getNormalizedColumnNames('specimen')

module.exports = [
  {
    loadInitialData,
    modelFactory: 'sequelizeDocumentModel',
    name: 'specimen',
    normalizedColumnNames,
  },
]
