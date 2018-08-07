const agents = require('./agents')
const collectingDates = require('./collectingDates')
const collectingLocations = require('./collectingLocations')
const collectingPlaces = require('./collectingPlaces')
const age = require('./age')
const id = require('./id')
const identifiers = require('./identifiers')
const idNumeric = require('./idNumeric')

module.exports = [
  id,

  agents,
  collectingDates,
  collectingLocations,
  collectingPlaces,
  identifiers,
  idNumeric,
  age,
]
