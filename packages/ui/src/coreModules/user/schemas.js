export const loginRequest = {
  additionalProperties: false,
  properties: {
    password: {
      type: 'string',
    },
    username: {
      type: 'string',
    },
  },
  required: ['username', 'password'],
  type: 'object',
}
