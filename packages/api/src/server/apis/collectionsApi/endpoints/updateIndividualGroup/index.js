const fs = require('fs')
const path = require('path')
const routeHandler = require('./routeHandler')

const description = fs.readFileSync(
  path.join(__dirname, './description.md'),
  'utf8'
)

module.exports = {
  description,
  method: 'put',
  path: '/collections/api/v01/individualGroups/{id}',
  pathParams: ['id'],
  request: {
    format: 'object',
  },
  resource: 'individualGroup',
  response: {
    format: 'object',
  },
  routeHandler,
  summary: 'Update an individual group by id',
}
