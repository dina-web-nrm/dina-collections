const capitalizeFirstLetter = require('common/src/stringFormatters/capitalizeFirstLetter')

module.exports = function buildOperationId({
  operationType,
  relationKey,
  resource,
}) {
  if (relationKey) {
    return `${resource}${capitalizeFirstLetter(
      operationType
    )}${capitalizeFirstLetter(relationKey)}`
  }

  return `${resource}${capitalizeFirstLetter(operationType)}`
}
