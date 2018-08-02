const crudOperations = require('./crudOperations')
const importOperations = require('./importOperations')
const jobOperations = require('./jobOperations')
const viewOperations = require('./viewOperations')

module.exports = {
  ...crudOperations,
  ...importOperations,
  ...jobOperations,
  ...viewOperations,
}
