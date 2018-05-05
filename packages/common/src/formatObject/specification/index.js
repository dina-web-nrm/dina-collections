const models = require('../../../dist/models.json')
const createFormatSpecifications = require('./createFormatSpecifications')

const formatSpecifications = createFormatSpecifications(models)

module.exports = formatSpecifications
