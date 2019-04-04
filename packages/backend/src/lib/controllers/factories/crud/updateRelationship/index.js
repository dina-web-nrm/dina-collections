const updateJsonRelationship = require('./updateJsonRelationship')
const updateSqlRelationship = require('./updateSqlRelationship')

module.exports = function updateRelationship({ models, operation, ...rest }) {
  const {
    operationId,
    relation: { keyType },
  } = operation

  switch (keyType) {
    case 'json': {
      return updateJsonRelationship({ models, operation, ...rest })
    }
    case 'polymorphic': {
      throw new Error(`update polymorphic relationship not yet implemented`)
    }
    case 'sql': {
      return updateSqlRelationship({ models, operation, ...rest })
    }
    default: {
      throw new Error(
        `Unknown relationship keyType ${keyType} for ${operationId}`
      )
    }
  }
}
