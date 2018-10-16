const {
  createFeatureRangeMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const {
  createFeatureRangeFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const fieldPath = 'attributes.searchOnlyFields.weightObject'
const key = 'searchWeight'
const searchFilterName = 'rangeWeight'

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
        rangeType: featureType.key,
        rangeUnit,
        rangeValue,
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
  fieldPath,
  filters: {
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
