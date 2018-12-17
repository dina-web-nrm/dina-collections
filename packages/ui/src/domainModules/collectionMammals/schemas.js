import immutable from 'object-path-immutable'
import schemaInterface from 'common/es5/schemaInterface'

const models = schemaInterface.getModels()

const createMammalFormModels = () => {
  let updatedModels = { ...models }

  // date range validation
  updatedModels = immutable.set(updatedModels, 'dateRange', {
    ...updatedModels.dateRange,
    allOf: [
      { 'x-validation-date-range-in-the-past': true },
      { 'x-validation-date-range-end-after-start': true },
      { 'x-validation-date-range-start-and-end': true },
      { 'x-validation-date-range-valid-if-not-empty': true },
      { 'x-validation-date-range-no-orphan-day': true },
      { 'x-validation-date-range-no-orphan-month': true },
    ],
  })

  // determination key is a temporary uuid needed for React array key
  updatedModels = immutable.set(updatedModels, 'determination.properties', {
    ...updatedModels.determination.properties,
    key: { type: 'string' },
  })

  // feature observations have object structure in form
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

  // latitude and longitude validation
  updatedModels = immutable.set(updatedModels, 'position.properties.latitude', {
    ...updatedModels.position.properties.latitude,
    allOf: [
      { 'x-validation-digits-and-decimal-point': true },
      { 'x-validation-latitude': true },
    ],
  })

  updatedModels = immutable.set(
    updatedModels,
    'position.properties.longitude',
    {
      ...updatedModels.position.properties.longitude,
      allOf: [
        { 'x-validation-digits-and-decimal-point': true },
        { 'x-validation-longitude': true },
      ],
    }
  )

  // storage location is required for physical object in collection item
  updatedModels = immutable.set(updatedModels, 'collectionItem.required', [
    'physicalObject',
  ])
  updatedModels = immutable.set(updatedModels, 'physicalObject.required', [
    'storageLocation',
  ])
  updatedModels = immutable.set(updatedModels, 'storageLocation.required', [
    'id',
  ])
  updatedModels = immutable.set(
    updatedModels,
    'storageLocation.properties.id',
    {
      minLength: 1,
      type: 'string',
    }
  )

  return updatedModels
}

const mammalFormModels = createMammalFormModels()

export { mammalFormModels }
