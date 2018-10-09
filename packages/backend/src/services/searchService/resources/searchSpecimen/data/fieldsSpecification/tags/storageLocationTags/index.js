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

const fieldPath = 'attributes.tags.storageLocationTags'
const key = 'storageLocationTags'
const resource = 'storageLocationTag'
const tagValueAggregationName = 'aggregateStorageLocationValues'
const tagTypeAggregationName = 'aggregateStorageLocationTypes'
const searchFilterName = 'searchStorageLocationTags'
const matchFilterName = 'matchStorageLocationTags'

const transformation = ({ migrator, target, locals }) => {
  const { storageLocations = [], storageLocationTexts = [] } = locals

  const tags = []
  storageLocations.forEach(({ name, group }) => {
    const tagType = group
    const tagValue = name

    tags.push({
      key: `${tagType}-${tagValue}`,
      tagType,
      tagValue,
    })
  })

  storageLocationTexts.forEach(storageLocationText => {
    const tagType = 'text'
    const tagValue = storageLocationText

    tags.push({
      key: `${tagType}-${tagValue}`,
      tagType,
      tagValue,
    })
  })

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: tags,
  })
  return null
}
module.exports = {
  aggregations: {
    [tagTypeAggregationName]: createTagTypeAggregation({
      fieldPath,
      resource,
    }),
    [tagValueAggregationName]: createTagValueAggregation({
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
