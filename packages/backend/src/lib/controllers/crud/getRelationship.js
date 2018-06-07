const getJsonRelationship = require('../utilities/relationships/getJsonRelationship')
const getSqlRelationship = require('../utilities/relationships/getSqlRelationship')

module.exports = function getRelationship({ models, operation }) {
  const { operationId, relation: { keyType } } = operation

  switch (keyType) {
    case 'json': {
      return getJsonRelationship({ models, operation })
    }
    case 'sql': {
      return getSqlRelationship({ models, operation })
    }
    default: {
      throw new Error(
        `Unknown relationship keyType ${keyType} for ${operationId}`
      )
    }
  }
}
