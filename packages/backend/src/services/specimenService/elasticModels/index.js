const normalizedSchemaSpecification = require('common/src/normalize/normalizedSchemaSpecification')
// const loadInitialData = require('./loadInitialData')
const createModel = require('../../../lib/elasticsearch/models/factories/normalizedElasticModel')

const normalizedColumnNames = Object.keys(
  normalizedSchemaSpecification.specimen
).map(key => {
  return normalizedSchemaSpecification.specimen[key].column
})

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
]
