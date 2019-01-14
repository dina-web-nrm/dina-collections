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
const tagValueAggregationName = 'aggregateStorageLocationTagValues'
const tagTypeAggregationName = 'aggregateStorageLocationTagTypes'
const searchFilterName = 'searchStorageLocationTags'
const matchFilterName = 'matchStorageLocationTags'

const delimiter = 'ddaadd'

const findLevel2ParentSufix = storageLocation => {
  const isRoot = storageLocation.group === 'root'
  if (isRoot) {
    return ''
  }

  const isLevel2 = storageLocation.group === 'mountingWall'
  if (isLevel2) {
    return ` ${storageLocation.name}`
  }

  if (!storageLocation.parent) {
    return ` ${storageLocation.group}`
  }

  return findLevel2ParentSufix(storageLocation.parent)
}

const fetchSufix = storageLocation => {
  if (storageLocation.group === 'room') {
    return ` room`
  }

  if (storageLocation.group === 'mountingWall') {
    if (storageLocation.parent) {
      return ` in ${storageLocation.parent.name}`
    }
    return ' on mounting wall'
  }

  return findLevel2ParentSufix(storageLocation)
}

const transformation = ({ migrator, target, locals }) => {
  const { storageLocations = [], storageLocationTexts = [] } = locals

  const tags = []

  storageLocations.forEach(storageLocation => {
    const { name, group } = storageLocation
    const tagType = group
    const sufix = fetchSufix(storageLocation)
    const tagValue = `${name}${sufix}`
    tags.push({
      key: `${tagType}${delimiter}${tagValue}`,
      tagType,
      tagValue,
    })
  })

  storageLocationTexts.forEach(storageLocationText => {
    const tagType = 'text'
    const tagValue = storageLocationText

    tags.push({
      key: `${tagType}${delimiter}${tagValue}`,
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
