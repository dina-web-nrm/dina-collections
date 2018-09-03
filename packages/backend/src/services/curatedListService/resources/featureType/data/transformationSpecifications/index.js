const allFromSrcWithIndexId = require('../../../../../../lib/data/transformations/sharedTransformations/allFromSrcWithIndexId')

exports.importDataFromFile = {
  description: 'Importing featureTypes from file',
  srcFileName: 'featureTypes',
  transformationFunctions: [allFromSrcWithIndexId],
}
