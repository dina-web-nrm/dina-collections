const interpolate = require('../../utilities/interpolate')

module.exports = function buildResponses({ operationId, response }) {
  if (!response) {
    throw new Error(`Provide response for ${operationId}`)
  }
  const { description, name } = response
  const responses = {
    200: {
      content: {
        'application/json': {
          schema: {
            $ref: `__ROOT__${name}`,
          },
        },
      },
      description: description || 'successful operation',
    },
  }
  return interpolate(responses, '__ROOT__', '#/components/schemas/')
}
