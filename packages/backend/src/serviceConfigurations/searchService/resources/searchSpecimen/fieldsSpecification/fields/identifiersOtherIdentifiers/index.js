const {
  createKeywordMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.identifiersOtherIdentifiers'

const CATALOG_NUMBER_TYPE = 'catalog-no'

const transformation = ({ migrator, src, target }) => {
  const identifiers = migrator.getValue({
    obj: src,
    path: 'individual.identifiers',
  })

  if (!identifiers) {
    return null
  }

  const otherIdentifiers = identifiers
    .map(identifier => {
      const { identifierType: { key } = {}, value } = identifier
      if (key !== CATALOG_NUMBER_TYPE) {
        return value
      }
      return null
    })
    .filter(identifier => {
      return !!identifier
    })

  if (otherIdentifiers && otherIdentifiers.length) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: otherIdentifiers,
    })
  }
  return null
}

module.exports = {
  fieldPath,
  key: 'identifiersOtherIdentifiers',
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
