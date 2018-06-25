const transformationFunctions = require('./transformationFunctions')

exports.importDataFromFile = {
  description: 'Importing taxa from file',
  srcFileName: 'taxa',
  transformationFunctions: [transformationFunctions.transformTaxon],
}
