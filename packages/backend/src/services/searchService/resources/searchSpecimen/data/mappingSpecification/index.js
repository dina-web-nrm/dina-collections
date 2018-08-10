const fieldsSpecification = require('../fieldsSpecification')
const extractMappings = require('../../../../../../lib/data/fields/utilities/extractMappings')

const mappings = extractMappings({ fieldsSpecification, format: 'object' })

module.exports = { mappings }
