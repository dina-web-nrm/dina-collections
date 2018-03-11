const interpolate = require('../../utilities/interpolate')

module.exports = function buildResponses({ errors, operationId, response }) {
  if (!response) {
    throw new Error(`Provide response for ${operationId}`)
  }
  const { description, name, status = 200 } = response
  const responses = {
    [status]: {
      content: {
        'application/vnd.api+json': {
          schema: {
            $ref: `__ROOT__${name}`,
          },
        },
      },
      description: description || 'successful operation',
    },
  }
  if (errors) {
    Object.keys(errors).forEach(errorStatus => {
      const key = `${operationId}-${errorStatus}`
      responses[errorStatus] = {
        content: {
          'application/vnd.api+json': {
            schema: {
              $ref: `__ROOT__${key}`,
            },
          },
        },
        description: `Error: ${errorStatus}`,
      }
    })
  }

  return interpolate(responses, '__ROOT__', '#/components/schemas/')
}
