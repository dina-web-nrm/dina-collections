const objectPath = require('object-path')

const backendError400 = require('common/src/error/errorFactories/backendError400')
const extractIdentifiersFromSpecimen = require('./extractIdentifiersFromSpecimen')

module.exports = function extractCatalogNumberFromSpecimen({
  identifierTypeId,
  specimen,
}) {
  const identifiers = extractIdentifiersFromSpecimen(specimen)
  const catalogNumberIdentifiers = identifiers.filter(identifier => {
    return objectPath.get(identifier, 'identifierType.id') === identifierTypeId
  })

  const nCatalogNumbers = catalogNumberIdentifiers.length
  if (nCatalogNumbers > 1) {
    backendError400({
      code: 'REQUEST_ERROR',
      detail: 'More than 1 catalogNumber found',
    })
  }
  if (nCatalogNumbers === 1) {
    return catalogNumberIdentifiers[0].value
  }
  return null
}
