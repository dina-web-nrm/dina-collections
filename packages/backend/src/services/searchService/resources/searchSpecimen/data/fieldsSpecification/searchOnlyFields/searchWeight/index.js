const {
  createNestedMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

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
      const weight = Number(featureObservation.featureObservationText)

      weightObjects.push({
        weight,
        weightType: featureType.key,
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

const rangeFilter = {
  description: 'Search weight',
  elasticsearch: ({ value = {} }) => {
    const { min, max, weightType } = value

    const must = []
    if (min || max) {
      must.push({
        range: {
          [`${fieldPath}.weight`]: {
            gte: min || undefined,
            lte: max || undefined,
          },
        },
      })
    }

    if (weightType) {
      must.push({
        match: { [`${fieldPath}.weightType`]: weightType },
      })
    }

    return {
      nested: {
        path: fieldPath,
        query: {
          bool: {
            must,
          },
        },
      },
    }
  },
  inputSchema: {
    type: 'object',
  },
  key: searchFilterName,
}

module.exports = {
  fieldPath,
  filters: {
    [searchFilterName]: rangeFilter,
  },
  key,
  mapping: createNestedMapping({
    fieldPath,
  }),
  selectable: true,
  transformation,
}
