const { compose } = require('redux')
const createSchemaValidator = require('../../jsonSchema/createValidator')
const systemErrorFactory = require('../errorFactories/system')
const ajvErrorMapper = require('../errorMappers/ajv')

const errorHandler = compose(systemErrorFactory, ajvErrorMapper)

module.exports = function createSystemModelSchemaValidator({
  dataPath,
  model,
  schema,
  throwOnError,
}) {
  return createSchemaValidator({
    dataPath,
    errorHandler,
    model,
    schema,
    throwOnError,
  })
}
