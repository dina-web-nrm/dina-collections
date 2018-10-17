const extractFeatureText = require('../../utilities/extractFeatureText')
const createStringAggregation = require('../../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createTagMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const {
  createKeywordAndRawMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.lengthTags'
const key = 'lengthTags'
const resource = 'lengthTag'
const aggregationName = 'aggregateLengthTags'
const searchFilterName = 'searchLengthTags'
const matchFilterName = 'matchLengthTags'

const FEATURE_GROUP = 'length'

const transformation = ({ migrator, src, target }) => {
  const featureTexts = extractFeatureText({
    extractKey: true,
    fallbackUnit: 'unknown-length-type',
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
