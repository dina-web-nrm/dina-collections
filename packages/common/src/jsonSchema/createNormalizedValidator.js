const schemaInterface = require('../schemaInterface')
const createValidatorFactory = require('./createValidatorFactory')

const normalizedModels = schemaInterface.getNormalizedModels()

module.exports = createValidatorFactory({ models: normalizedModels })
