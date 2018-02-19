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
  path: '/specimensApi/v01/specimens',
  request: {
    description: 'A request description',
    format: 'object',
  },
  resource: 'specimen',
  response: {
    format: 'object',
  },
  routeHandler,
  summary: 'Create an individual group and a catalogUnit if not existing',
}
