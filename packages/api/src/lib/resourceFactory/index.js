const operationFactories = require('./operationFactories')

module.exports = function createResource({
  basePath,
  modelName: modelNameInput,
  operations: operationsInput = [],
  relations,
  resource,
  resourcePlural: resourcePluralInput,
}) {
  const resourcePlural = resourcePluralInput || `${resource}s`
  const modelName = modelNameInput || resource

  if (operationsInput.length === 0) {
    throw new Error(`Have to provide operations. Missing for: ${resource}`)
  }

  return operationsInput.reduce((operations, operation) => {
    const { operationType } = operation
    if (!operationFactories[operationType]) {
      throw new Error(`Unknown operationType: ${operationType}`)
    }

    const { operationId, ...rest } = operationFactories[operationType]({
      basePath,
      modelName,
      relations,
      resource,
      resourcePlural,
      ...operation,
    })
    return {
      ...operations,
      [operationId]: rest, // eslint-disable-line
    }
  }, {})
}
// exports.createResource = ({
//   operations: ['create', 'getOne', 'getMany','update', 'delete'],
//   resource: 'physicalUnit',
//   resourcePlural: 'physicalUnits',
//   belongsTo: 'inventoryUnit',
// }) => {

// }
