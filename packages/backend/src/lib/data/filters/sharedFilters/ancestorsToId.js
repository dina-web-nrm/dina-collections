const interceptor = require('../../interceptors/sharedInterceptors/ancestorsToId')

module.exports = {
  description: 'Find ancestors to resource with provided id',
  inputSchema: {
    type: 'string',
  },
  interceptor,
  key: 'ancestorsToId',
}
