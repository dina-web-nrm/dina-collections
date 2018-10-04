const extractPhysicalUnitStrings = require('../../utilities/extractPhysicalUnitStrings')
const createStringAggregation = require('../../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createStringMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const {
  createKeywordAndRawMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.skeletonTags'
const key = 'skeletonTags'
const resource = 'skeletonTag'
const aggregationName = 'aggregateSkeletonTags'
const searchFilterName = 'searchSkeletonTags'
const matchFilterName = 'matchSkeletonTags'

const CATEGORY_SKELETON = 'skeleton'

const transformation = ({ migrator, src, target }) => {
  const tags = extractPhysicalUnitStrings({
    includePreparationType: preparationType => {
      return preparationType && preparationType.category === CATEGORY_SKELETON
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
      value: ['No skeleton'],
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
