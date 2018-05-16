import immutable from 'object-path-immutable'
import models from 'common/dist/models.json'

const createMammalFormModels = () => {
  const updatedModels = immutable.set(
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

  return updatedModels
}

const mammalFormModels = createMammalFormModels()

export { mammalFormModels }
