import createSystemFrontendValidator from 'common/es5/error/validators/createSystemFrontendValidator'
import createSpecification from '../factories/specification'
import schema from '../inputConfigSchema'

const validate = obj => {
  return createSystemFrontendValidator({
    schema,
    throwError: false,
    type: 'config',
  })(obj)
}

export default function validateConfig(config) {
  let error = validate(config)
  if (error) {
    return error
  }
  try {
    createSpecification(config)
  } catch (err) {
    error = err.stack || err.message || err
  }

  return error
}
