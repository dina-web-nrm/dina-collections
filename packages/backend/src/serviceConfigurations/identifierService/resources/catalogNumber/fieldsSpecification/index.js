const id = require('./id')
const identifier = require('./identifier')
const number = require('./number')
const year = require('./year')

module.exports = {
  fields: [number, identifier, id, year],
}
