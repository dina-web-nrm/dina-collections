import immutable from 'object-path-immutable'

import models from 'common/dist/models.json'

export const mammalFormModels = immutable.set(
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
