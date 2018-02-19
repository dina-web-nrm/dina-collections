const { compose } = require('redux')
const createSchemaValidator = require('../../jsonSchema/createValidator')
const systemErrorFactory = require('../errorFactories/system')
const ajvErrorMapper = require('../errorMappers/ajv')

module.exports = function createSystemSchemaValidator({ context, schema }) {
  const errorHandler = compose(systemErrorFactory({ context }), ajvErrorMapper)
  return createSchemaValidator({
    errorHandler,
    schema,
  })
}
