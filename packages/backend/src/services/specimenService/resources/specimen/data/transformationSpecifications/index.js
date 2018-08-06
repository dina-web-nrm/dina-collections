const execute = require('./execute')
const lookupSpecifications = require('../../../lookupResources/specification')

const {
  collectingInformation,
  collectionItems,
  deathInformation,
  featureTypes,
  id,
  identifiers,
  nestToCore,
  publishRecord,
  readOnly,
  recordHistoryEvents,
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
    id,
    taxonInformation,
    identifiers,
    collectionItems,
    collectingInformation,
    featureTypes,
    recordHistoryEvents,
    deathInformation,
    publishRecord,
    readOnly,
    nestToCore,
  ],
  warmViews,
}
