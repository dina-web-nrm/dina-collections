const expectNoValidationError = require('../../../utilities/test/expectNoValidationError')
const createSystemBackendValidator = require('common/src/error/validators/createSystemBackendValidator')
const modelConfigurationSchema = require('../../models/schemas/modelConfiguration')

const validate = createSystemBackendValidator({
  schema: modelConfigurationSchema,
  throwError: false,
  type: 'config',
})

module.exports = function testResourceSpecification(modelConfiguration) {
  it('Passes schema validation', () => {
    expectNoValidationError(validate(modelConfiguration))
  })
}
