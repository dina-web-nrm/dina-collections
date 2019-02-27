const extractFeatureText = require('../../utilities/extractFeatureText')
const createStringAggregation = require('../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createTagMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createKeywordAndRawMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.ageStageTags'
const key = 'ageStageTags'
const resource = 'ageStageTag'
const aggregationName = 'aggregateAgeStageTags'
const searchFilterName = 'searchAgeStageTags'
const matchFilterName = 'matchAgeStageTags'

const FEATURE_TYPE = 'age-stage'

const transformation = ({ migrator, src, target }) => {
  let featureTexts = extractFeatureText({
    featureTypeKey: FEATURE_TYPE,
    migrator,
    src,
  })

  if (!featureTexts || !featureTexts.length) {
    featureTexts = ['unknown']
  }

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
