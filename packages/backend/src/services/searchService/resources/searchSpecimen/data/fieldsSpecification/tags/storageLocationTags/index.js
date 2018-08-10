const createStringAggregation = require('../../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createStringMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const {
  createKeywordAndRawMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.storageLocationTags'
const key = 'storageLocationTags'
const resource = 'storageLocationTag'
const aggregationName = 'aggregateStorageLocationTags'
const searchFilterName = 'searchStorageLocationTags'
const matchFilterName = 'matchStorageLocationTags'

const transformation = ({ migrator, target, locals }) => {
  const { storageLocations = [], storageLocationTexts = [] } = locals

  const tags = []
  storageLocations.forEach(({ name, group }) => {
    tags.push(`${name} (${group})`)
  })

  storageLocationTexts.forEach(storageLocationText => {
    tags.push(`${storageLocationText} (text)`)
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
