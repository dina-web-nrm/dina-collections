const transformationFunctions = require('./transformationFunctions')

exports.importDataFromFile = {
  description: 'Importing taxonNames from file',
  srcFileName: 'taxonNames',
  transformationFunctions: [transformationFunctions.transformTaxonName],
}
