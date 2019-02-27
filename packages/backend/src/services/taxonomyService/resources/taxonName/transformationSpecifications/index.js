const transformationFunctions = require('./transformationFunctions')

exports.importDataFromFile = {
  description: 'Importing taxonNames from file',
  srcFileName: 'taxonNames',
  storeResourceActivity: true,
  transformationFunctions: [transformationFunctions.transformTaxonName],
}
