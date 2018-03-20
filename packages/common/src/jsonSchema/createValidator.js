const models = require('../../dist/models.json')
const createValidatorFactory = require('./createValidatorFactory')

module.exports = createValidatorFactory(models)
