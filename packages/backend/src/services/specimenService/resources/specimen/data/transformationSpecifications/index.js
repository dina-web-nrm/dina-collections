const lookupSpecifications = require('../../../lookupResources/specification')
const {
  collectionItems,
  id,
  identifiers,
  nestToCore,
} = require('./transformationFunctions')

const warmViews = lookupSpecifications.map(({ name }) => {
  return name
})

exports.importDataFromFile = {
  description: 'Importing specimens from file',
  srcFileName: 'specimens',
  transformationFunctions: [id, identifiers, collectionItems, nestToCore],
  warmViews,
}
