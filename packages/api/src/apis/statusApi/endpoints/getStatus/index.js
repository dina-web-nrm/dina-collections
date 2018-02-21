/* eslint-disable sort-keys */
const routeHandler = require('./routeHandler')

module.exports = {
  method: 'get',
  path: '/api/status/v01/status',
  resource: 'status',
  response: {
    raw: {
      schema: {
        description: 'this is a desc',
        content: {
          type: 'object',
          additionalProperties: false,
          properties: {
            data: {
              type: 'object',
              properties: {
                up: { type: 'boolean' },
              },
            },
          },
        },
      },
    },
  },
  routeHandler,
  summary: 'Gets a status object',
}
