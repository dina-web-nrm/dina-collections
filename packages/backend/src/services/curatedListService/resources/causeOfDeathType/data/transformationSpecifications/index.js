const allFromSrcWithIndexId = require('../../../../../../lib/data/transformations/sharedTransformations/allFromSrcWithIndexId')

exports.importDataFromFile = {
  description: 'Importing causeOfDeathTypes from file',
  srcFileName: 'causeOfDeathTypes',
  transformationFunctions: [allFromSrcWithIndexId],
}
