const expectNoValidationError = require('../../../utilities/test/expectNoValidationError')
const createSystemBackendValidator = require('common/src/error/validators/createSystemBackendValidator')
const serviceSpecificationSchema = require('../schemas/serviceSpecification')

const validate = createSystemBackendValidator({
  schema: serviceSpecificationSchema,
  throwError: false,
  type: 'config',
})

module.exports = function testServiceSpecification(serviceSpecification) {
  describe(serviceSpecification.type, () => {
    it('Passes schema validation', () => {
      expectNoValidationError(validate(serviceSpecification))
    })
  })
}
