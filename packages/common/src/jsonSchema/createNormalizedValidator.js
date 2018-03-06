const models = require('../../dist/normalizedModels.json')
const createValidatorFactory = require('./createValidatorFactory')

module.exports = createValidatorFactory(models)
