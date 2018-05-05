const models = require('../../../dist/models.json')
const createFormatSpecifications = require('./createFormatSpecifications')

const formatSpecifications = createFormatSpecifications(models)

module.exports = function getFormatSpecification(type) {
  if (!formatSpecifications[type]) {
    throw new Error(`Format specificaiton dont exist for type: ${type}`)
  }
  return formatSpecifications[type]
}
