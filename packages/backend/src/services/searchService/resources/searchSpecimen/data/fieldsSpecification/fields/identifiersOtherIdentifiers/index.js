const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.identifiersOtherIdentifiers'

const CATALOG_NUMBER_TYPE = 'catalog-number'

const transformation = ({ migrator, src, target }) => {
  const identifiers = migrator.getValue({
    obj: src,
    path: 'individual.identifiers',
  })

  if (!identifiers) {
    return null
  }

  const otherIdentifiers = identifiers.filter(identifier => {
    const { identifierType: { key } = {} } = identifier
    if (key !== CATALOG_NUMBER_TYPE) {
      return true
    }
    return false
  })

  if (otherIdentifiers && otherIdentifiers.length) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: otherIdentifiers.value,
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
