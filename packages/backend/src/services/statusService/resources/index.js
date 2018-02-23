/* eslint-disable sort-keys */
exports.status = {
  operations: [
    {
      controller: 'getStatus',
      method: 'get',
      path: '/api/status/v01/status',
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
              },
            },
          },
        },
      },
    },
  ],
}
