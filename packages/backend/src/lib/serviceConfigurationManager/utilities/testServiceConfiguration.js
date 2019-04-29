const expectNoValidationError = require('../../../utilities/test/expectNoValidationError')
const createSystemBackendValidator = require('common/src/error/validators/createSystemBackendValidator')
const serviceConfigurationSchema = require('../schemas/serviceConfiguration')

const validate = createSystemBackendValidator({
  schema: serviceConfigurationSchema,
  throwError: false,
  type: 'config',
})

module.exports = function testServiceSpecification(serviceConfiguration) {
  it('Passes schema validation', () => {
    expectNoValidationError(validate(serviceConfiguration))
  })
}
