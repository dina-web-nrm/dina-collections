const transformationFunctions = require('./transformationFunctions')

exports.importDataFromFile = {
  description: 'Importing places from file',
  srcFileName: 'localities',
  transformationFunctions,
}
