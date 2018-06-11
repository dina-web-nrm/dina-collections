const crudOperations = require('./crudOperations')
const viewOperations = require('./viewOperations')
const jobOperations = require('./jobOperations')

module.exports = {
  ...crudOperations,
  ...jobOperations,
  ...viewOperations,
}
