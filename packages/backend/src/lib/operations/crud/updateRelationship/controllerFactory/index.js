const updateJsonRelationship = require('./updateJsonRelationship')
const updateSqlRelationship = require('./updateSqlRelationship')

module.exports = function updateRelationship({
  models,
  operationSpecification,
  ...rest
}) {
  const {
    operationId,
    relation: { keyType },
  } = operationSpecification

  switch (keyType) {
    case 'json': {
      return updateJsonRelationship({ models, operationSpecification, ...rest })
    }
    case 'polymorphic': {
      throw new Error(`update polymorphic relationship not yet implemented`)
    }
    case 'sql': {
      return updateSqlRelationship({ models, operationSpecification, ...rest })
    }
    default: {
      throw new Error(
        `Unknown relationship keyType ${keyType} for ${operationId}`
      )
    }
  }
}
