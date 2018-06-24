const transformationFunctions = require('./transformationFunctions')

exports.importDataFromFile = {
  description: 'Importing storageLocations from file',
  srcFileName: 'storageLocations',
  transformationFunctions,
}
