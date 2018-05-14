const models = require('../../dist/models.json')
const createNormalizeSpecifications = require('./normalize/createNormalizeSpecifications')
const createRelationshipSpecifications = require('./relationships/createRelationshipSpecifications')
const createDbSpecifications = require('./db/createDbSpecifications')

const relationshipSpecifications = createRelationshipSpecifications({ models })
const normalizeSpecifications = createNormalizeSpecifications({ models })
const dbSpecifications = createDbSpecifications({ models })

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
