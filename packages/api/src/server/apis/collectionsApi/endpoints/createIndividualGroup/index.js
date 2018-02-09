const fs = require('fs')
const path = require('path')
const routeHandler = require('./routeHandler')

const description = fs.readFileSync(
  path.join(__dirname, './description.md'),
  'utf8'
)

module.exports = {
  description,
  method: 'post',
  path: '/collections/api/v01/individualGroups',
  request: {
    description: 'A request description',
    format: 'object',
  },
  resource: 'individualGroup',
  response: {
    format: 'object',
  },
  routeHandler,
  summary: 'Create an individual group and a catalogUnit if not existing',
}
