const extractFeatureText = require('../../utilities/extractFeatureText')
const createStringAggregation = require('../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createTagMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createKeywordAndRawMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.boneTags'
const key = 'boneTags'
const resource = 'boneTag'
const aggregationName = 'aggregateBoneTags'
const searchFilterName = 'searchBoneTags'
const matchFilterName = 'matchBoneTags'

const FEATURE_GROUP = 'bone-count'

const transformation = ({ migrator, src, target }) => {
  const featureTexts = extractFeatureText({
    extractFeatureTypeName: true,
    featureGroupKey: FEATURE_GROUP,
    migrator,
    src,
  })

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: featureTexts,
  })

  return null
}

module.exports = {
  aggregations: {
    [aggregationName]: createStringAggregation({
      defaultLimit: 20,
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
