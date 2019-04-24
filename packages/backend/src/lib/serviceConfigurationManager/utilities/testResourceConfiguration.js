const expectNoValidationError = require('../../../utilities/test/expectNoValidationError')
const createSystemBackendValidator = require('common/src/error/validators/createSystemBackendValidator')
const resourceSpecificationSchema = require('../schemas/resourceSpecification')

const validate = createSystemBackendValidator({
  schema: resourceSpecificationSchema,
  throwError: false,
  type: 'config',
})

module.exports = function testResourceSpecification(resourceSpecification) {
  it('Passes schema validation', () => {
    expectNoValidationError(validate(resourceSpecification))
  })
}
