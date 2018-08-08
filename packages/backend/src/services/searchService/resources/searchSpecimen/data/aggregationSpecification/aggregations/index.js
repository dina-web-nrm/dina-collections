const fieldsSpecification = require('../../fieldsSpecification')
const extractAggregations = require('../../../../../../../lib/data/fields/utilities/extractAggregations')

const fieldAggregations = extractAggregations({
  fieldsSpecification,
  format: 'object',
})

const ageStage = require('./ageStage')
// const agents = require('./agents')
const collectingLocations = require('./collectingLocations')
const identifiers = require('./identifiers')

module.exports = {
  // agents,
  ageStage,
  collectingLocations,
  identifiers,
  ...fieldAggregations,
}
