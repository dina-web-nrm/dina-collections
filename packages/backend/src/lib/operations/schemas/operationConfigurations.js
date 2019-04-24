const crudOperationSchemas = require('../crud/schemas')
const importOperations = require('../import/schemas')
const jobOperationSchemas = require('../job/schemas')
const viewOperationSchemas = require('../view/schemas')

module.exports = {
  ...crudOperationSchemas,
  ...importOperations,
  ...jobOperationSchemas,
  ...viewOperationSchemas,
}
