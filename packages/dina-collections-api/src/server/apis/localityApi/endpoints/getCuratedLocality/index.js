const routeHandler = require('./routeHandler')

module.exports = {
  method: 'get',
  path: '/localities/api/v01/curatedLocality/{id}',
  pathParams: ['id'],
  resource: 'curatedLocality',
  response: {
    format: 'object',
  },
  routeHandler,
  summary: 'Find latest version of a curatedLocality',
}
