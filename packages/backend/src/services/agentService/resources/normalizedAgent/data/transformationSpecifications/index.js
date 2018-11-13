const transformationFunctions = require('./transformationFunctions')

exports.importDataFromFile = {
  description: 'Importing agents from file',
  srcFileName: 'agents',
  storeResourceActivity: true,
  transformationFunctions: [transformationFunctions.transformAgent],
}
