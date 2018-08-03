const collectingDates = require('./collectingDates')
const collectingPlaces = require('./collectingPlaces')
const collectingLocations = require('./collectingLocations')
const id = require('./id')
const identifiers = require('./identifiers')
// const idNumeric = require('./idNumeric')

module.exports = [
  collectingDates,
  collectingLocations,
  collectingPlaces,
  id,
  identifiers,
  // idNumeric
]
