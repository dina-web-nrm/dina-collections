const allFromSrcWithIndexId = require('../../../../../../lib/data/transformations/sharedTransformations/allFromSrcWithIndexId')

exports.importDataFromFile = {
  description: 'Importing establishmentMeansTypes from file',
  srcFileName: 'establishmentMeansTypes',
  transformationFunctions: [allFromSrcWithIndexId],
}
