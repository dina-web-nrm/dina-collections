const crudOperations = require('./crud')
const importOperations = require('./import')
const jobOperations = require('./job')
const viewOperations = require('./view')

module.exports = {
  ...crudOperations,
  ...importOperations,
  ...jobOperations,
  ...viewOperations,
}
