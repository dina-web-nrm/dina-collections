module.exports = function createOperationId(resourceType, operationType) {
  return `${resourceType}${operationType}`
}
