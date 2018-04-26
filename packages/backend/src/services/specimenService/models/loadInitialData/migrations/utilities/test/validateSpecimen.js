const createNormalizedValidator = require('common/src/jsonSchema/createNormalizedValidator')

const validate = obj => {
  return createNormalizedValidator({
    model: 'specimen',
    throwError: true,
    type: 'config',
  })(obj)
}

module.exports = function validateSpecimen(specimen) {
  return validate(specimen)
}
