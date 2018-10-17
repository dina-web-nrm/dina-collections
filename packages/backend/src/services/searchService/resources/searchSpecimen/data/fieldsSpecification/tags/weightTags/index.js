const {
  createTagTypeAggregation,
} = require('../../../../../../../../lib/data/aggregations/factories')
const {
  createFeatureRangeMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const {
  createFeatureRangeFilter,
  createTagMatchFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const fieldPath = 'attributes.searchOnlyFields.weightObject'
const key = 'weightTags'
const searchFilterName = 'rangeWeight'

const resource = 'weightTag'
const aggregationName = 'aggregateWeightTags'
const matchFilterName = 'matchWeightTags'

const transformation = ({ migrator, src, target }) => {
  const featureObservations = migrator.getValue({
    obj: src,
    path: 'individual.featureObservations',
  })

  if (!featureObservations) {
    return null
  }
  const weightObjects = []
  featureObservations.forEach(featureObservation => {
    const { featureType } = featureObservation
    if (!featureType) {
      return
    }

    if (
      featureType.group === 'weight' &&
      featureObservation.featureObservationText !== undefined
    ) {
      const rangeValue = Number(featureObservation.featureObservationText)
      const rangeUnit = featureObservation.featureObservationUnit

      weightObjects.push({
        rangeUnit,
        rangeValue,
        tagType: featureType.key,
      })
    }
  })

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: weightObjects,
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
