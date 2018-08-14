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

module.exports = function nestToCore({ globalIndex, target, reporter }) {
  const { id, attributes } = target
  const coreSpecimen =
    nestedToCoreSync({
      item: attributes,
      type: 'specimen',
    }) || {}

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
