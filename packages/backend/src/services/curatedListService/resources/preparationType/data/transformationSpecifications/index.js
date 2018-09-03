const allFromSrcWithIndexId = require('../../../../../../lib/data/transformations/sharedTransformations/allFromSrcWithIndexId')

exports.importDataFromFile = {
  description: 'Importing preparationTypes from file',
  srcFileName: 'preparationTypes',
  transformationFunctions: [allFromSrcWithIndexId],
}
