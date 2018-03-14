const expectNoValidationError = require('../../../utilities/test/expectNoValidationError')
const createSystemFrontendValidator = require('common/src/error/validators/createSystemFrontendValidator')
const serviceSpecificationSchema = require('../schemas/serviceSpecification')

const validate = createSystemFrontendValidator({
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
