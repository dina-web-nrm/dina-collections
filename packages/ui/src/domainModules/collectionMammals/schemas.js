import immutable from 'object-path-immutable'
import models from 'common/dist/models.json'

const createMammalFormModels = () => {
  let updatedModels = immutable.set(
    models,
    'individual.properties.featureObservations',
    {
      patternProperties: {
        '/./g': {
          $ref: 'featureObservation',
        },
      },
      type: 'object',
    }
  )

  updatedModels = immutable.set(updatedModels, 'event.properties.isDeathDate', {
    type: 'boolean',
  })
  return updatedModels
}

const mammalFormModels = createMammalFormModels()

export { mammalFormModels }
