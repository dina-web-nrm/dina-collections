const crudOperationSchemas = require('../../operations/crudOperations/schemas')
const viewOperationSchemas = require('../../operations/viewOperations/schemas')

const operationSchemas = {
  ...crudOperationSchemas,
  ...viewOperationSchemas,
}

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
  const { type } = operationSpecification
  describe(operationSpecification.type, () => {
    it('Passes schema validation', () => {
      if (!operationSchemas[type]) {
        throw new Error(`Unknow operation type ${type}`)
      }

      return expectNoValidationError(
        validate(operationSchemas[type], operationSpecification)
      )
    })
  })
}
