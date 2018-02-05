const interpolate = require('../../utilities/interpolate')

module.exports = function buildResponses({ operationId, response }) {
  if (!response) {
    throw new Error(`Provide response for ${operationId}`)
  }
  const responses = {
    200: {
      description: 'successful operation',
      schema: {
        $ref: `__ROOT__${response.name}`,
      },
    },
  }
  return interpolate(responses, '__ROOT__', '#/definitions/')
}
