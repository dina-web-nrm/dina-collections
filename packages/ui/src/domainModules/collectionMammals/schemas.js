import immutable from 'object-path-immutable'
import schemaInterface from 'common/es5/schemaInterface'

const models = schemaInterface.getModels()

const createMammalFormModels = () => {
  let updatedModels = immutable.set(models, 'collectionItem', {
    ...models.collectionItem,
    deepRequired: ['/physicalObject/storageLocation/id'],
  })

  updatedModels = immutable.set(updatedModels, 'dateRange', {
    ...updatedModels.dateRange,
    allOf: [
      { 'x-validation-date-range-end-in-the-past': true },
      { 'x-validation-date-range-end-after-start': true },
      { 'x-validation-date-range-start-and-end': true },
      { 'x-validation-date-range-valid-if-not-empty': true },
      { 'x-validation-date-range-no-orphan-day': true },
      { 'x-validation-date-range-no-orphan-month': true },
    ],
  })

  updatedModels = immutable.set(updatedModels, 'determination.properties', {
    ...updatedModels.determination.properties,
    key: { type: 'string' },
  })

  updatedModels = immutable.set(
    updatedModels,
    'individual.properties.featureObservations',
    {
      ...updatedModels.individual.properties.featureObservations,
      patternProperties: {
        '/./g': {
          $ref: 'featureObservation',
        },
      },
      type: 'object',
    }
  )

  updatedModels = immutable.set(updatedModels, 'position.properties.latitude', {
    ...updatedModels.position.properties.latitude,
    'x-validation-latitude': true,
  })

  updatedModels = immutable.set(
    updatedModels,
    'position.properties.longitude',
    {
      ...updatedModels.position.properties.longitude,
      'x-validation-longitude': true,
    }
  )

  return updatedModels
}

const mammalFormModels = createMammalFormModels()

export { mammalFormModels }
