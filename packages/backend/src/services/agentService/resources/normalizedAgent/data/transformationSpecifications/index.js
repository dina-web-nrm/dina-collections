const allFromSrcWithIndexId = require('../../../../../../lib/data/transformations/sharedTransformations/allFromSrcWithIndexId')

exports.importDataFromFile = {
  description: 'Importing agents from file',
  srcFileName: 'agents',
  transformationFunctions: [allFromSrcWithIndexId],
}
