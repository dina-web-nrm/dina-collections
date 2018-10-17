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

const fieldPath = 'attributes.tags.higherGeographyTags'
const key = 'higherGeographyTags'
const resource = 'higherGeographyTag'
const tagValueAggregationName = 'aggregateHigherGeographyTagValues'
const tagTypeAggregationName = 'aggregateHigherGeographyTagTypes'
const searchFilterName = 'searchHigherGeographyTags'
const matchFilterName = 'matchHigherGeographyTags'

const delimiter = 'ddaadd'

const transformation = ({ migrator, target, locals }) => {
  const { collectingPlaces } = locals

  const tags = []

  if (collectingPlaces) {
    collectingPlaces.forEach(({ attributes: { name, group } }) => {
      const tagType = group
      const tagValue = name
      tags.push({
        key: `${tagType}${delimiter}${tagValue}`,
        tagType,
        tagValue,
      })
    })
  }

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
