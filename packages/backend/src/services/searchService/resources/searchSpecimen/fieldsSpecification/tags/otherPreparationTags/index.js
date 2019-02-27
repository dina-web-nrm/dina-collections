const extractPhysicalUnitStrings = require('../../utilities/extractPhysicalUnitStrings')
const createStringAggregation = require('../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createTagMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createKeywordAndRawMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.otherPreparationTags'
const key = 'otherPreparationTags'
const resource = 'otherPreparationTag'
const aggregationName = 'aggregateOtherPreparationTags'
const searchFilterName = 'searchOtherPreparationTags'
const matchFilterName = 'matchOtherPreparationTags'

const CATEGORY = 'other-preparation'

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
      value: ['no other preparation'],
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
    [matchFilterName]: createTagMatchFilter({
      fieldPath,
      nested: false,
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
