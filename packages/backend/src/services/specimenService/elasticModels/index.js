const {
  getNormalizedColumnNames,
} = require('common/src/formatObject/specifications')

const loadInitialData = require('./loadInitialData')
const createModel = require('../../../lib/elasticsearch/models/factories/normalizedElasticModel')

const normalizedColumnNames = getNormalizedColumnNames('specimen')
const specimenFactory = function specimen({ elasticsearch }) {
  return createModel({
    elasticsearch,
    name: 'specimen',
    normalizedColumnNames,
  })
}

module.exports = [
  {
    factory: specimenFactory,
    name: 'specimen',
  },
  {
    factory: loadInitialData,
    name: 'loadInitialData',
  },
]
