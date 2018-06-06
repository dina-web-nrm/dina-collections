const crudOperations = require('./crudOperations')
const viewOperations = require('./viewOperations')

module.exports = {
  ...crudOperations,
  ...viewOperations,
}
