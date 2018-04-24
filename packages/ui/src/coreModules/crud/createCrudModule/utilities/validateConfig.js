import createSystemFrontendValidator from 'common/es5/error/validators/createSystemFrontendValidator'
import createSpecification from '../factories/specification'
import createDux from '../factories/dux'
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
    const specification = createSpecification(config)
    createDux(specification)
  } catch (err) {
    error = err.stack || err.message || err
  }

  return error
}
