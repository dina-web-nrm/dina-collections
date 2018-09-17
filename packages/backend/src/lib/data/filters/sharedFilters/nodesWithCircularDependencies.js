const interceptor = require('../../interceptors/sharedInterceptors/nodesWithCircularDependencies')

module.exports = {
  description: 'Find nodes with circularDependencies',
  inputSchema: {
    type: 'boolean',
  },
  interceptor,
  key: 'nodesWithCircularDependencies',
}
