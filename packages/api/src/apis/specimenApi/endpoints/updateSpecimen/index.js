const fs = require('fs')
const path = require('path')
const routeHandler = require('./routeHandler')

const description = fs.readFileSync(
  path.join(__dirname, './description.md'),
  'utf8'
)

module.exports = {
  description,
  method: 'patch',
  path: '/specimensApi/v01/specimens/{id}',
  pathParams: ['id'],
  request: {
    format: 'object',
  },
  resource: 'specimen',
  response: {
    format: 'object',
  },
  routeHandler,
  summary: 'Update an individual group by id',
}
