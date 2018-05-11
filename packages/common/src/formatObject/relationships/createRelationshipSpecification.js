const getModelType = require('../utilities/getModelType')
const getModelRelationshipPath = require('../utilities/getModelRelationshipPath')
const getModelFormat = require('../utilities/getModelFormat')

module.exports = function createRelationshipSpecification(
  { relationships = {} } = {}
) {
  return Object.keys(relationships.properties || {}).reduce(
    (modelRelationships, relationshipKey) => {
      const modelRelationship = relationships.properties[relationshipKey]
      const path = getModelRelationshipPath(modelRelationship)

      return {
        ...modelRelationships,
        [relationshipKey]: {
          format: getModelFormat(modelRelationship.properties.data),
          path,
          type: getModelType(modelRelationship.properties.data),
        },
      }
    },
    {}
  )
}
