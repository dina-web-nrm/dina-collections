const transformationFunctions = require('./transformationFunctions')

exports.importDataFromFile = {
  description: 'Importing taxa from file',
  srcFileName: 'taxa',
  storeResourceActivity: true,
  transformationFunctions: [transformationFunctions.transformTaxon],
}
