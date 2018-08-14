const execute = require('./execute')
const lookupSpecifications = require('../../../lookupResources/specification')

const {
  acquisition,
  collectingInformation,
  collectionItems,
  deathInformation,
  determination,
  featureTypes,
  identifiers,
  individual,
  nestToCore,
  originInformation,
  readOnly,
  recordHistoryEvents,
  specimen,
  taxonInformation,
} = require('./transformationFunctions')

const warmViews = lookupSpecifications.map(({ name }) => {
  return name
})

exports.importDataFromFile = {
  cacheRequestsToResources: ['identifierType', 'causeOfDeathTypes'],
  description: 'Importing specimens from file',
  executeFunction: execute,
  srcFileName: 'specimens',
  transformationFunctions: [
    specimen,
    taxonInformation,
    determination,
    identifiers,
    collectionItems,
    collectingInformation,
    featureTypes,
    recordHistoryEvents,
    deathInformation,
    individual,
    originInformation,
    acquisition,
    readOnly,
    nestToCore,
  ],
  warmViews,
}
