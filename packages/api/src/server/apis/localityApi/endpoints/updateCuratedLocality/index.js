const routeHandler = require('./routeHandler')

module.exports = {
  method: 'put',
  path: '/localities/api/v01/curatedLocality/{id}',
  pathParams: ['id'],
  request: {
    format: 'object',
  },
  resource: 'curatedLocality',
  response: {
    format: 'object',
  },
  routeHandler,
  summary: 'Update an curatedLocality id',
}
