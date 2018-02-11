const routeHandler = require('./routeHandler')

module.exports = {
  method: 'get',
  path: '/localities/api/v01/curatedLocality/{id}/versions/{versionId}',
  pathParams: ['id', 'versionId'],
  resource: 'curatedLocality',
  response: {
    format: 'object',
  },
  routeHandler,
  summary: 'Find a curatedLocality by version',
}
