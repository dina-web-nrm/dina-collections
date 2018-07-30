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

module.exports = function validateSpecimen(specimen) {
  return validate(specimen)
}

module.exports = function nestToCore({ target, reporter }) {
  const { id, attributes } = target

  const coreSpecimen =
    nestedToCoreSync({
      item: attributes,
      type: 'specimen',
    }) || {}

  const errors = coreSpecimen.attributes && validate(coreSpecimen.attributes)

  if (errors || !coreSpecimen.attributes) {
    reporter.increment({
      path: 'transformations.errors',
    })
    reporter.push({
      path: 'transformations.idsWithErrors',
      value: id,
    })

    target.attributes = null
    return
  }

  target.attributes = coreSpecimen.attributes
}
