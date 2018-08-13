const createNormalizedValidator = require('common/src/jsonSchema/createNormalizedValidator')
const nestedToCoreSync = require('common/src/formatObject/nestedToCoreSync')
/* eslint-disable no-param-reassign */

const validate = obj => {
  return createNormalizedValidator({
    model: 'specimen',
    throwError: false,
    type: 'config',
  })(obj)
}

module.exports = function nestToCore({ globalIndex, target, src, reporter }) {
  const { id, attributes } = target
  const coreSpecimen =
    nestedToCoreSync({
      item: attributes,
      type: 'specimen',
    }) || {}

  // delete src.analysis.AccessionNo
  // delete src.analysis.Meas_Comments
  // delete src.analysis.TypeOfWeight
  // delete src.analysis.TypeOfWeight_related
  // delete src.analysis.Condition
  // delete src.analysis.Condition_related

  // delete src.collection.SkeletonCollection
  // delete src.collection.SkeletonCollection_related

  // delete src.collection.SkeletonStatus
  // delete src.collection.SkeletonStatus_related

  // delete src.collection.SkinCollection
  // delete src.collection.SkinCollection_related

  // delete src.collection.SkinStatus
  // delete src.collection.SkinStatus_related

  // delete src.collection.AccessionNo

  // if (Object.keys(src.analysis).length > 0) {
  //   console.log('JSON.stringify src', JSON.stringify(src.analysis, null, 2))
  // }

  const errors = coreSpecimen.attributes && validate(coreSpecimen.attributes)

  if (errors || !coreSpecimen.attributes) {
    reporter.rebuildViewValidationError({
      id,
      index: globalIndex,
    })
    target.id = null
    target.attributes = null
    return
  }

  target.relationships = coreSpecimen.relationships
  target.attributes = coreSpecimen.attributes
}
