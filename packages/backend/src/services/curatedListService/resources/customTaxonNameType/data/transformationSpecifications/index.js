const allFromSrcWithIndexId = require('../../../../../../lib/data/transformations/sharedTransformations/allFromSrcWithIndexId')

exports.importDataFromFile = {
  description: 'Importing customTaxonNameTypes from file',
  srcFileName: 'customTaxonNameTypes',
  transformationFunctions: [allFromSrcWithIndexId],
}
