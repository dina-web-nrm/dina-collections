const extractFeatureText = require('../../utilities/extractFeatureText')
const createStringAggregation = require('../../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createStringMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const {
  createKeywordAndRawMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.ageStageTags'
const key = 'ageStageTags'
const resource = 'ageStageTag'
const aggregationName = 'aggregateAgeStageTags'
const searchFilterName = 'searchAgeStageTags'
const matchFilterName = 'matchAgeStageTags'

const FEATURE_TYPE = 'age-stage'

const transformation = ({ migrator, src, target }) => {
  const featureTexts = extractFeatureText({
    featureTypeKey: FEATURE_TYPE,
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
