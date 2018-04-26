const createDenormalizedValidator = require('common/src/jsonSchema/createValidator')

const validate = obj => {
  return createDenormalizedValidator({
    model: 'individual',
    throwError: false,
    type: 'config',
  })(obj)
}

module.exports = function validateSpecimen(specimen) {
  return validate(specimen)
}
