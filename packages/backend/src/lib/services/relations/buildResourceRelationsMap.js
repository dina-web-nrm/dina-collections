const immutable = require('object-path-immutable')
const getRelationKey = require('./getRelationKey')
const getFormat = require('./getFormat')

module.exports = function buildResourceRelationsMap(associations) {
  return associations.reduce(
    (resourceRelationsMap, associationSpecification) => {
      const {
        external,
        sourceResource,
        targetResource,
      } = associationSpecification
      const relationKey = getRelationKey(associationSpecification)
      const format = getFormat(associationSpecification)

      return immutable.set(
        resourceRelationsMap,
        `${sourceResource}.${relationKey}`,
        {
          format,
          resource: targetResource || sourceResource,
          storeInDocument: !!external,
        }
      )
    },
    {}
  )
}
