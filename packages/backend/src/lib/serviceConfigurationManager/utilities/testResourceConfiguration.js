const expectNoValidationError = require('../../../utilities/test/expectNoValidationError')
const createSystemBackendValidator = require('common/src/error/validators/createSystemBackendValidator')
const resourceConfigurationSchema = require('../schemas/resourceConfiguration')

const validate = createSystemBackendValidator({
  schema: resourceConfigurationSchema,
  throwError: false,
  type: 'config',
})

module.exports = function testResourceSpecification(resourceConfiguration) {
  it('Passes schema validation', () => {
    expectNoValidationError(validate(resourceConfiguration))
  })
}
