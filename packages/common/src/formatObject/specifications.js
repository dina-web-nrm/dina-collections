const models = require('../../dist/models.json')
const createNormalizeSpecifications = require('./normalize/createNormalizeSpecifications')
const createRelationshipSpecifications = require('./relationships/createRelationshipSpecifications')

const relationshipSpecifications = createRelationshipSpecifications({ models })
const normalizeSpecifications = createNormalizeSpecifications({ models })

exports.getNormalizeSpecification = function getNormalizeSpecification(type) {
  return normalizeSpecifications[type]
}

exports.getRelationshipSpecification = function getRelationshipSpecification(
  type
) {
  return relationshipSpecifications[type]
}
