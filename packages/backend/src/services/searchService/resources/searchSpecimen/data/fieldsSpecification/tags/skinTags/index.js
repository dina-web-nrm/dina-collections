const extractPhysicalUnitStrings = require('../../utilities/extractPhysicalUnitStrings')
const createStringAggregation = require('../../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createStringMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const {
  createKeywordAndRawMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.skinTags'
const key = 'skinTags'
const resource = 'skinTag'
const aggregationName = 'aggregateSkinTags'
const searchFilterName = 'searchSkinTags'
const matchFilterName = 'matchSkinTags'

const CATEGORY = 'skin'

const transformation = ({ migrator, src, target }) => {
  const tags = extractPhysicalUnitStrings({
    includePreparationType: preparationType => {
      return preparationType && preparationType.category === CATEGORY
    },
    includeStorageLocation: false,
    migrator,
    src,
  })

  if (tags && tags.length) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: tags,
    })
  } else {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: ['no skin'],
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
