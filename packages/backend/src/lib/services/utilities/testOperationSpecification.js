const create = require('../operationFactory/typeFactories/schemas/create')
const getMany = require('../operationFactory/typeFactories/schemas/getMany')
const getOne = require('../operationFactory/typeFactories/schemas/getOne')
const getRelationHasMany = require('../operationFactory/typeFactories/schemas/getRelationHasMany')
const getRelationHasOne = require('../operationFactory/typeFactories/schemas/getRelationHasOne')
const getVersion = require('../operationFactory/typeFactories/schemas/getVersion')
const getVersions = require('../operationFactory/typeFactories/schemas/getVersions')
const update = require('../operationFactory/typeFactories/schemas/update')
const updateRelationHasMany = require('../operationFactory/typeFactories/schemas/updateRelationHasMany')
const updateRelationHasOne = require('../operationFactory/typeFactories/schemas/updateRelationHasOne')
const raw = require('../operationFactory/typeFactories/schemas/raw')

const expectNoValidationError = require('../../../utilities/test/expectNoValidationError')
const createSystemFrontendValidator = require('common/src/error/validators/createSystemFrontendValidator')

const validate = (schema, obj) => {
  return createSystemFrontendValidator({
    schema,
    throwError: false,
    type: 'config',
  })(obj)
}

module.exports = function testOperationSpecification(operationSpecification) {
  const { type } = operationSpecification
  describe(operationSpecification.type, () => {
    it('Passes schema validation', () => {
      switch (type) {
        case 'create': {
          expectNoValidationError(validate(create, operationSpecification))
          break
        }
        case 'getMany': {
          expectNoValidationError(validate(getMany, operationSpecification))
          break
        }
        case 'getOne': {
          expectNoValidationError(validate(getOne, operationSpecification))
          break
        }
        case 'getRelationHasMany': {
          expectNoValidationError(
            validate(getRelationHasMany, operationSpecification)
          )
          break
        }
        case 'getRelationHasOne': {
          expectNoValidationError(
            validate(getRelationHasOne, operationSpecification)
          )
          break
        }

        case 'getVersion': {
          expectNoValidationError(validate(getVersion, operationSpecification))
          break
        }

        case 'getVersions': {
          expectNoValidationError(validate(getVersions, operationSpecification))
          break
        }

        case 'update': {
          expectNoValidationError(validate(update, operationSpecification))
          break
        }

        case 'updateRelationHasMany': {
          expectNoValidationError(
            validate(updateRelationHasMany, operationSpecification)
          )
          break
        }

        case 'updateRelationHasOne': {
          expectNoValidationError(
            validate(updateRelationHasOne, operationSpecification)
          )
          break
        }

        case 'raw': {
          expectNoValidationError(validate(raw, operationSpecification))
          break
        }

        default: {
          throw new Error(`Unknow operation type ${type}`)
        }
      }
    })
  })
}
