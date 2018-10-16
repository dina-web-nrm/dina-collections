const {
  createTagValueAggregation,
  createTagTypeAggregation,
} = require('../../../../../../../../lib/data/aggregations/factories')
const {
  createTagMatchFilter,
  createTagSearchFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const {
  createValueTagMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.identifierTags'
const key = 'identifierTags'
const resource = 'identifierTag'
const tagValueAggregationName = 'aggregateIdentifierTagValues'
const tagTypeAggregationName = 'aggregateIdentifierTagTypes'
const searchFilterName = 'searchIdentifierTags'
const matchFilterName = 'matchIdentifierTags'

const delimiter = 'ddaadd'

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
      const {
        identifierType: { key: tagType } = {},
        value: tagValue,
      } = identifier
      if (tagType && tagValue) {
        return {
          key: `${tagType}${delimiter}${tagValue}`,
          tagType,
          tagValue,
        }
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
    [tagTypeAggregationName]: createTagTypeAggregation({
      fieldPath,
      resource,
    }),
    [tagValueAggregationName]: createTagValueAggregation({
      delimiter,
      fieldPath,
      resource,
    }),
  },
  fieldPath,
  filters: {
    [matchFilterName]: createTagMatchFilter({
      fieldPath,
    }),
    [searchFilterName]: createTagSearchFilter({
      fieldPath,
    }),
  },
  key,
  mapping: createValueTagMapping({
    fieldPath,
  }),
  selectable: true,
  transformation,
}
