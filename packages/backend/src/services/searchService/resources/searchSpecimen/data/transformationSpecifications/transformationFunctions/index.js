const fieldsSpecification = require('../../fieldsSpecification')
const extractTransformations = require('../../../../../../../lib/data/fields/utilities/extractTransformationFunctions')

// const agents = require('./agents')
const collectingDates = require('./collectingDates')
const collectingLocations = require('./collectingLocations')
const collectingPlaces = require('./collectingPlaces')
const age = require('./age')
const id = require('./id')
const identifiers = require('./identifiers')
const idNumeric = require('./idNumeric')

const fieldTransformations = extractTransformations({
  fieldsSpecification,
  format: 'array',
})

module.exports = [
  id,
  // agents,
  collectingDates,
  collectingLocations,
  collectingPlaces,
  identifiers,
  idNumeric,
  age,
  ...fieldTransformations,
]
