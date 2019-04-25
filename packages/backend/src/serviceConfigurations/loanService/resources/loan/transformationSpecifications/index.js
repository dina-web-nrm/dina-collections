const transformationFunctions = require('./transformationFunctions')

exports.importDataFromFile = {
  description: 'Importing loans from file',
  srcFileName: 'loans',
  storeResourceActivity: true,
  transformationFunctions: [transformationFunctions.transformLoan],
}
