const transformationFunctions = require('./transformationFunctions')

exports.importDataFromFile = {
  description: 'Importing places from file',
  srcFileName: 'localities',
  storeResourceActivity: true,
  transformationFunctions: [transformationFunctions.transformPlace],
}
