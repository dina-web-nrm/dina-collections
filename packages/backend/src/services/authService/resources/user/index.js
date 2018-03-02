/* eslint-disable sort-keys */
module.exports = {
  operations: [
    {
      method: 'get',
      operationId: 'getUser',
      path: '/auth/realms/dina/protocol/openid-connect/userInfo',
      raw: true,
      resource: 'user',
      response: {
        raw: {
          schema: {
            description: 'this is a desc',
            content: {
              type: 'object',
              additionalProperties: false,
              properties: {
                email: { type: 'string', example: 'john.doe@example.com' },
                family_name: { type: 'string', example: 'Doe' },
                given_name: { type: 'string', example: 'John' },
                name: { type: 'string', example: 'John Doe' },
                preferred_username: { type: 'string', example: 'john doe' },
                sub: { type: 'string', example: 'xxxx' },
              },
              required: ['email', 'preferred_username'],
            },
          },
        },
      },
      summary: 'Gets user object',
    },
  ],
}
