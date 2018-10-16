const {
  createFeatureRangeMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const {
  createFeatureRangeFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const fieldPath = 'attributes.searchOnlyFields.lengthObject'
const key = 'searchLength'
const searchFilterName = 'rangeLength'

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
      featureType.group === 'length' &&
      featureObservation.featureObservationText !== undefined
    ) {
      const rangeValue = Number(featureObservation.featureObservationText)
      const rangeUnit = featureObservation.featureObservationUnit

      lengthObjects.push({
        rangeType: featureType.key,
        rangeUnit,
        rangeValue,
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
