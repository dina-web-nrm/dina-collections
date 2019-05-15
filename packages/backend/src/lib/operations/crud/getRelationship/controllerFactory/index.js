const getJsonRelationship = require('./getJsonRelationship')
const getPolymorphicRelationship = require('./getPolymorphicRelationship')
const getSqlRelationship = require('./getSqlRelationship')

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
