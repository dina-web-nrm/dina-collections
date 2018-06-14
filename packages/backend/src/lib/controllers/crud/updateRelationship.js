const updateJsonRelationship = require('../utilities/relationships/updateJsonRelationship')
const updateSqlRelationship = require('../utilities/relationships/updateSqlRelationship')

module.exports = function updateRelationship({ models, operation }) {
  const { operationId, relation: { keyType } } = operation

  switch (keyType) {
    case 'json': {
      return updateJsonRelationship({ models, operation })
    }
    case 'sql': {
      return updateSqlRelationship({ models, operation })
    }
    default: {
      throw new Error(
        `Unknown relationship keyType ${keyType} for ${operationId}`
      )
    }
  }
}
