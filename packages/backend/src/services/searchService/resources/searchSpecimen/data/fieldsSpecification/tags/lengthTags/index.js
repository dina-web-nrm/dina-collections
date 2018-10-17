const {
  createTagTypeAggregation,
} = require('../../../../../../../../lib/data/aggregations/factories')
const {
  createFeatureRangeFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const {
  createFeatureRangeMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.lengthTags'
const key = 'lengthTags'
const resource = 'lengthTag'
const aggregationName = 'aggregateLengthTags'
const searchFilterName = 'rangeLength'
const matchFilterName = 'matchLengthTags'

const FEATURE_GROUP = 'length'

const transformation = ({ migrator, src, target }) => {
  const featureObservations = migrator.getValue({
    obj: src,
    path: 'individual.featureObservations',
  })

  if (!featureObservations) {
    return null
  }
  const lengthObjects = []
  featureObservations.forEach(featureObservation => {
    const { featureType } = featureObservation
    if (!featureType) {
      return
    }

    if (
      featureType.group === FEATURE_GROUP &&
      featureObservation.featureObservationText !== undefined
    ) {
      const rangeValue = Number(featureObservation.featureObservationText)
      const rangeUnit = featureObservation.featureObservationUnit

      lengthObjects.push({
        rangeUnit,
        rangeValue,
        tagType: featureType.key,
      })
    }
  })

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: lengthObjects,
  })

  return null
}

module.exports = {
  aggregations: {
    [aggregationName]: createTagTypeAggregation({
      fieldPath,
      resource,
    }),
  },
  fieldPath,
  filters: {
    [matchFilterName]: createFeatureRangeFilter({
      fieldPath,
    }),
    [searchFilterName]: createFeatureRangeFilter({
      fieldPath,
    }),
  },
  key,
  mapping: createFeatureRangeMapping({
    fieldPath,
  }),
  selectable: true,
  transformation,
}
