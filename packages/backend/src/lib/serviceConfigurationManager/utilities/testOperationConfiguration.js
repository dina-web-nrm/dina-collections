const operationConfigurationSchemas = require('../../operations/schemas/operationConfigurations')
const expectNoValidationError = require('../../../utilities/test/expectNoValidationError')
const createSystemBackendValidator = require('common/src/error/validators/createSystemBackendValidator')

const validate = (schema, obj) => {
  return createSystemBackendValidator({
    schema,
    throwError: false,
    type: 'config',
  })(obj)
}

module.exports = function testOperationSpecification(operationSpecification) {
  const { type, operationSpecificationFactory } = operationSpecification
  if (operationSpecificationFactory) {
    return
  }

  it('Passes schema validation', () => {
    if (!operationConfigurationSchemas[type]) {
      throw new Error(`Unknow operation type ${type}`)
    }

    return expectNoValidationError(
      validate(operationConfigurationSchemas[type], operationSpecification)
    )
  })
}
