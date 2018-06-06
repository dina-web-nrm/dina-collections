const create = require('../operationFactory/typeFactories/schemas/create')
const del = require('../operationFactory/typeFactories/schemas/del')
const getMany = require('../operationFactory/typeFactories/schemas/getMany')
const getOne = require('../operationFactory/typeFactories/schemas/getOne')
const getRelationship = require('../operationFactory/typeFactories/schemas/getRelationship')
const getVersion = require('../operationFactory/typeFactories/schemas/getVersion')
const getVersions = require('../operationFactory/typeFactories/schemas/getVersions')
const update = require('../operationFactory/typeFactories/schemas/update')
const updateRelationship = require('../operationFactory/typeFactories/schemas/updateRelationship')
const raw = require('../operationFactory/typeFactories/schemas/raw')

const expectNoValidationError = require('../../../utilities/test/expectNoValidationError')
const createSystemBackendValidator = require('common/src/error/validators/createSystemBackendValidator')

const validate = (schema, obj) => {
  return createSystemBackendValidator({
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
        case 'getRelationship': {
          expectNoValidationError(
            validate(getRelationship, operationSpecification)
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

        case 'updateRelationship': {
          expectNoValidationError(
            validate(updateRelationship, operationSpecification)
          )
          break
        }

        case 'del': {
          expectNoValidationError(validate(del, operationSpecification))
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
