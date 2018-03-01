module.exports = function createOperationMap(operations) {
  return operations.reduce((map, operation) => {
    const { operationId } = operation
    return {
      ...map,
      [operationId]: operation,
    }
  }, {})
}
