const {
  createKeywordMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.identifiersCatalogNumber'

const CATALOG_NUMBER_TYPE = 'catalog-no'
const transformation = ({ migrator, src, target }) => {
  const identifiers = migrator.getValue({
    obj: src,
    path: 'individual.identifiers',
  })

  if (!identifiers) {
    return null
  }

  const catalogNumberIdentifier = identifiers.find(identifier => {
    const { identifierType: { key } = {} } = identifier
    if (key === CATALOG_NUMBER_TYPE) {
      return true
    }
    return false
  })

  if (catalogNumberIdentifier) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: catalogNumberIdentifier.value,
    })
  }
  return null
}

module.exports = {
  fieldPath,
  key: 'identifiersCatalogNumber',
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
