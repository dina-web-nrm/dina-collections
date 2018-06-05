const createSchemaInterface = require('./createSchemaInterface')
const models = require('../../dist/models.json')

module.exports = createSchemaInterface({ models })
