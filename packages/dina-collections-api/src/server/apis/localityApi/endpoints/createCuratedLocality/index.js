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
  path: '/localities/api/v01/curatedLocality',
  request: {
    format: 'object',
  },
  resource: 'curatedLocality',
  response: {
    format: 'object',
  },
  routeHandler,
  summary: 'Create a curatedLocality',
}
