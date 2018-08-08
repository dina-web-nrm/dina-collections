const fieldsSpecification = require('../../fieldsSpecification')
const extractMappings = require('../../../../../../../lib/data/fields/utilities/extractMappings')

const ageStage = require('./ageStage')
const agents = require('./agents')
const collectingEndDate = require('./collectingEndDate')
const collectingLocations = require('./collectingLocations')
const collectingPlaces = require('./collectingPlaces')
const collectingStartDate = require('./collectingStartDate')
const id = require('./id')
const identifiers = require('./identifiers')
const idNumeric = require('./idNumeric')
const resultCatalogNumber = require('./result/catalogNumber')
const resultOtherIdentifiers = require('./result/otherIdentifiers')
const resultCollector = require('./result/collector')
const resultCollectingStartDate = require('./result/collectingStartDate')
const resultCollectingEndDate = require('./result/collectingEndDate')

const fieldMappings = extractMappings({ fieldsSpecification, format: 'object' })

module.exports = {
  agents,
  ageStage,
  collectingEndDate,
  collectingLocations,
  collectingPlaces,
  collectingStartDate,
  id,
  identifiers,
  idNumeric,
  resultCatalogNumber,
  resultCollectingEndDate,
  resultCollectingStartDate,
  resultCollector,
  resultOtherIdentifiers,
  ...fieldMappings,
}
