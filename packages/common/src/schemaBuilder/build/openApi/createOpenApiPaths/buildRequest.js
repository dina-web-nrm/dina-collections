const interpolate = require('../../utilities/interpolate')

module.exports = function buildRequest({ request }) {
  if (!request) {
    return undefined
  }
  const requestBody = {
    content: {
      'application/vnd.api+json': {
        schema: {
          $ref: `__ROOT__${request.name}`,
        },
      },
    },
    description: request.description || 'successful operation',
  }
  return interpolate(requestBody, '__ROOT__', '#/components/schemas/')
}
