module.exports = function createOperationId(operationType, resourceType) {
  return `${operationType}.${resourceType}`
}
