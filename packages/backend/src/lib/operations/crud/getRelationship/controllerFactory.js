const getJsonRelationship = require('../../utilities/relationships/getJsonRelationship')
const getPolymorphicRelationship = require('../../utilities/relationships/getPolymorphicRelationship')
const getSqlRelationship = require('../../utilities/relationships/getSqlRelationship')

module.exports = function getRelationship({ models, operationSpecification }) {
  const {
    operationId,
    relation: { keyType },
  } = operationSpecification

  switch (keyType) {
    case 'json': {
      return getJsonRelationship({ models, operationSpecification })
    }
    case 'polymorphic': {
      return getPolymorphicRelationship({ models, operationSpecification })
    }
    case 'sql': {
      return getSqlRelationship({ models, operationSpecification })
    }
    default: {
      throw new Error(
        `Unknown relationship keyType ${keyType} for ${operationId}`
      )
    }
  }
}
