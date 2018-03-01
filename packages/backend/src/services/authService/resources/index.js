/* eslint-disable sort-keys */

exports.user = {
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

/* eslint-disable sort-keys */

exports.accessToken = {
  operations: [
    {
      auth: false,
      method: 'post',
      operationId: 'loginUser',
      path: '/auth/realms/dina/protocol/openid-connect/token',
      raw: true,
      resource: 'user',
      request: {
        raw: {
          schema: {
            description: 'this is a desc for request',
            body: {
              type: 'object',
              additionalProperties: false,
              properties: {
                client_id: { type: 'string', example: 'dina-reset' },
                grant_type: { type: 'string', example: 'password' },
                password: { type: 'string', example: 'xxxxx' },
                username: { type: 'string', example: 'john doe' },
              },
              required: ['client_id', 'grant_type', 'password', 'username'],
            },
          },
        },
      },
      response: {
        raw: {
          schema: {
            description: 'this is a desc',
            content: {
              type: 'object',
              additionalProperties: false,
              properties: {
                access_token: { type: 'string', example: 'xxxx' },
                expires_in: { type: 'integer', example: 300 },
                'not-before-policy': { type: 'integer', example: 0 },
                refresh_expires_in: { type: 'integer', example: 1800 },
                refresh_token: { type: 'string', example: 'xxxx' },
                session_state: { type: 'string', example: 'bearer' },
                token_type: { type: 'string', example: 'xxxx' },
              },
              required: ['access_token'],
            },
          },
        },
      },
      summary: 'Gets user token',
    },
  ],
}
