const schemaInterface = require('../schemaInterface')
const createValidatorFactory = require('./createValidatorFactory')

const models = schemaInterface.getModels()

module.exports = createValidatorFactory({ models })
