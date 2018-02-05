export const loginRequest = {
  additionalProperties: false,
  properties: {
    password: {
      maxLength: 10,
      minLength: 5,
      type: 'string',
    },
    username: {
      maxLength: 10,
      minLength: 0,
      type: 'string',
    },
  },
  required: ['username', 'password'],
  type: 'object',
}
