const expectNoValidationError = require('../../../utilities/test/expectNoValidationError')
const createSystemFrontendValidator = require('common/src/error/validators/createSystemFrontendValidator')
const resourceSpecificationSchema = require('../schemas/resourceSpecification')

const validate = createSystemFrontendValidator({
  schema: resourceSpecificationSchema,
  throwError: false,
  type: 'config',
})

module.exports = function testResourceSpecification(resourceSpecification) {
  describe(resourceSpecification.type, () => {
    it('Passes schema validation', () => {
      expectNoValidationError(validate(resourceSpecification))
    })
  })
}
