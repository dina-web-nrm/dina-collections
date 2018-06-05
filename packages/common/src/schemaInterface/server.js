const path = require('path')

const readModels = require('../schemaBuilder/read/readModels')
const createSchemaInterface = require('./createSchemaInterface')

const modelBasePath = path.join(__dirname, '../../../models/src')
const models = readModels(modelBasePath)

module.exports = createSchemaInterface({ models })
