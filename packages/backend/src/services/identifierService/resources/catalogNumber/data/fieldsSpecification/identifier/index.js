const createEqualFilter = require('../../../../../../../lib/data/filters/factories/createEqualFilter')

const fieldPath = 'attributes.identifier'

const CATALOG_NUMBER_TYPE = 'catalog-number'
const transformation = ({ migrator, src, target }) => {
  const identifiers = migrator.getValue({
    obj: src,
    path: 'individual.identifiers',
  })

  if (!identifiers) {
    return null
  }

  const catalogNumberIdentifier = identifiers.filter(identifier => {
    const { identifierType: { key } = {} } = identifier
    if (key === CATALOG_NUMBER_TYPE) {
      return true
    }
    return false
  })

  if (catalogNumberIdentifier.length) {
    if (catalogNumberIdentifier.length > 1) {
      throw new Error('Multiple catalog numbers found')
    }

    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: catalogNumberIdentifier[0].value,
    })
  }

  return null
}

module.exports = {
  fieldPath,
  filters: {
    identifier: createEqualFilter({
      fieldPath: 'identifier',
    }),
  },
  key: 'identifiersCatalogNumber',
  selectable: true,
  sortable: true,
  transformation,
}
