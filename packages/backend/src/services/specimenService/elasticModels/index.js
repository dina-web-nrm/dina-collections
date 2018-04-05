// const loadInitialData = require('./loadInitialData')
const createModel = require('../../../lib/elasticsearch/models/factories/normalizedElasticModel')

const normalizedColumnNames = [
  'determinations',
  'distinguishedUnits',
  'events',
  'featureObservations',
  'identifiers',
  'individualCircumstances',
  'individualGroup',
  'relationships',
  'taxonInformation',
]

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
