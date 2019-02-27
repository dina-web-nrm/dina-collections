const objectPath = require('object-path')

module.exports = function extractIdentifiersFromSpecimen(specimen) {
  return objectPath.get(specimen, 'attributes.individual.identifiers') || []
}
