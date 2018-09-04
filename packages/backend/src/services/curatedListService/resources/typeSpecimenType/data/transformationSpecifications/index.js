const allFromSrcWithIndexId = require('../../../../../../lib/data/transformations/sharedTransformations/allFromSrcWithIndexId')

exports.importDataFromFile = {
  description: 'Importing typeSpecimenTypes from file',
  srcFileName: 'typeSpecimenTypes',
  transformationFunctions: [allFromSrcWithIndexId],
}
