const { compose } = require('redux')
const createSchemaValidator = require('../../jsonSchema/createValidator')
const systemErrorFactory = require('../errorFactories/system')
const serverErrorFactory = require('../errorFactories/server')
const ajvErrorMapper = require('../errorMappers/ajv')

module.exports = function createSystemModelSchemaValidator({
  context,
  dataPath,
  model,
  origin = 'client',
  schema,
  throwOnError,
}) {
  const errorHandler =
    origin === 'server'
      ? compose(serverErrorFactory({ context }), ajvErrorMapper)
      : compose(systemErrorFactory({ context }), ajvErrorMapper)

  return createSchemaValidator({
    dataPath,
    errorHandler,
    model,
    origin,
    schema,
    throwOnError,
  })
}
