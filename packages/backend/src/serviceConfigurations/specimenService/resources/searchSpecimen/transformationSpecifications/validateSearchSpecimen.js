const createNormalizedValidator = require('common/src/jsonSchema/createNormalizedValidator')
/* eslint-disable no-param-reassign */

const validate = obj => {
  return createNormalizedValidator({
    model: 'searchSpecimen',
    throwError: false,
    type: 'config',
  })(obj)
}

module.exports = function validateSearchSpecimen({
  globalIndex,
  target,
  reporter,
}) {
  const { id, attributes } = target

  const errors = validate(attributes)
  if (errors) {
    reporter.rebuildViewValidationError({
      id,
      index: globalIndex,
    })
    target.id = null
    target.attributes = null
  }
}
