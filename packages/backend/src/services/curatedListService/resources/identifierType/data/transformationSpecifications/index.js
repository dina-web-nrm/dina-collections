const allFromSrcWithIndexId = require('../../../../../../lib/data/transformations/sharedTransformations/allFromSrcWithIndexId')

exports.importDataFromFile = {
  description: 'Importing identifierTypes from file',
  srcFileName: 'identifierTypes',
  transformationFunctions: [allFromSrcWithIndexId],
}
