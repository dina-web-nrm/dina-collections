const crudOperationSchemas = require('../../../../operationFactories/crud/schemas')
const importOperations = require('../../../../operationFactories/import/schemas')
const jobOperationSchemas = require('../../../../operationFactories/job/schemas')
const viewOperationSchemas = require('../../../../operationFactories/view/schemas')

const operationSchemas = {
  ...crudOperationSchemas,
  ...importOperations,
  ...jobOperationSchemas,
  ...viewOperationSchemas,
}

const expectNoValidationError = require('../../../../../utilities/test/expectNoValidationError')
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
