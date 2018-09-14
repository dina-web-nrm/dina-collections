const {
  createNestedMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

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
      const length = Number(featureObservation.featureObservationText)

      lengthObjects.push({
        length,
        lengthType: featureType.key,
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

const rangeFilter = {
  description: 'Search length',
  elasticsearch: ({ value = {} }) => {
    const { min, max, lengthType } = value

    const must = []
    if (min || max) {
      must.push({
        range: {
          [`${fieldPath}.length`]: {
            gte: min || undefined,
            lte: max || undefined,
          },
        },
      })
    }

    if (lengthType) {
      must.push({
        match: { [`${fieldPath}.lengthType`]: lengthType },
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
