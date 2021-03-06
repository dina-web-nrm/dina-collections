const { getStatus: getStatusControllerFactory } = require('../../controllers')

/* eslint-disable sort-keys */
module.exports = {
  operations: [
    {
      controllerFactory: getStatusControllerFactory,
      method: 'get',
      path: '/status',
      operationId: 'getStatus',
      raw: true,
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
                meta: {
                  type: 'object',
                },
              },
            },
          },
        },
      },
      type: 'raw',
    },
  ],
}
