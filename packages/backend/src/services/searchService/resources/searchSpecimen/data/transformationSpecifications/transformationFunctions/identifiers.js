/* eslint-disable no-param-reassign */

const CATALOG_NUMBER_TYPE = 'catalog-number'

module.exports = ({ migrator, src, target }) => {
  const identifiers = migrator.getValue({
    obj: src,
    path: 'individual.identifiers',
  })

  if (!identifiers) {
    return null
  }

  let catalogNumber
  const otherIdentifiers = []

  const transformedIdentifiers = identifiers
    .map(identifier => {
      const { value, identifierType: { key } = {} } = identifier

      if (!(key && value !== undefined)) {
        return null
      }
      if (key === CATALOG_NUMBER_TYPE) {
        catalogNumber = value
      } else {
        otherIdentifiers.push(`${value} (${key})`)
      }

      return `${value} (${key})`
    })
    .filter(identifier => {
      return !!identifier
    })

  migrator.setValue({
    obj: target,
    path: 'attributes.identifiers',
    value: transformedIdentifiers,
  })

  if (catalogNumber) {
    migrator.setValue({
      obj: target,
      path: 'attributes.result.catalogNumber',
      value: catalogNumber,
    })
  }

  migrator.setValue({
    obj: target,
    path: 'attributes.result.otherIdentifiers',
    value: otherIdentifiers,
  })

  return null
}
