const {
  getModelKeyColumnMap,
  getNormalizeSpecifications,
  getResourceRelationshipParamsMap,
} = require('../schemaInterface')

const relationshipSpecifications = getResourceRelationshipParamsMap()
const normalizeSpecifications = getNormalizeSpecifications()
const dbSpecifications = getModelKeyColumnMap()

exports.getNormalizeSpecification = function getNormalizeSpecification(type) {
  return normalizeSpecifications[type]
}

exports.getRelationshipSpecification = function getRelationshipSpecification(
  type
) {
  return relationshipSpecifications[type]
}

exports.getDbSpecification = function getDbSpecification(type) {
  return dbSpecifications[type]
}

exports.getNormalizedColumnNames = function getNormalizedColumnNames(type) {
  const dbSpecification = exports.getDbSpecification(type)
  if (!dbSpecification) {
    return ['relationships']
  }

  return Object.keys(dbSpecification).reduce(
    (arr, key) => {
      return [...arr, dbSpecification[key]]
    },
    ['relationships']
  )
}
