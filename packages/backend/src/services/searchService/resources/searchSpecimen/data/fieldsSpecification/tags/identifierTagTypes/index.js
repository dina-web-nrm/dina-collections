const createStringAggregation = require('../../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createStringMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const {
  createKeywordAndRawMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.identifierTagTypes'
const key = 'identifierTagTypes'
const resource = 'identifierTagType'
const aggregationName = 'aggregateIdentifierTagTypes'
const searchFilterName = 'searchIdentifierTagTypes'
const matchFilterName = 'matchIdentifierTagTypes'

const transformation = ({ migrator, src, target }) => {
  const identifiers = migrator.getValue({
    obj: src,
    path: 'individual.identifiers',
  })

  if (!identifiers) {
    return null
  }
  const tags = identifiers
    .map(identifier => {
      const { identifierType: { key: identifierTypeKey } = {} } = identifier
      if (identifierTypeKey) {
        return `${identifierTypeKey}`
      }

      return null
    })
    .filter(identifier => {
      return !!identifier
    })

  if (tags && tags.length) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: tags,
    })
  }

  return null
}

module.exports = {
  aggregations: {
    [aggregationName]: createStringAggregation({
      fieldPath,
      resource,
    }),
  },
  fieldPath,
  filters: {
    [matchFilterName]: createStringMatchFilter({
      fieldPath,
    }),
    [searchFilterName]: createStringSearchFilter({
      fieldPath,
    }),
  },
  key,
  mapping: createKeywordAndRawMapping({
    fieldPath,
  }),
  selectable: true,
  transformation,
}
