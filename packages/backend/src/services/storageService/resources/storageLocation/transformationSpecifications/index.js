const transformationFunctions = require('./transformationFunctions')

exports.importDataFromFile = {
  description: 'Importing storageLocations from file',
  srcFileName: 'storageLocations',
  storeResourceActivity: true,
  transformationFunctions: [transformationFunctions.transformStorageLocation],
}
