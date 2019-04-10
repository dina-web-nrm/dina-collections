const createLog = require('../../utilities/log')
const removeInactiveServices = require('./utilities/removeInactiveServices')
const internalGetModelSpecifications = require('./utilities/getModelSpecifications')
const internalGetOperationSpecifications = require('./utilities/getOperationSpecifications')
const internalCreateModels = require('./utilities/createModels')
const internalCreateOperations = require('./utilities/createOperations')
const createServiceSpecifications = require('./utilities/createServiceSpecifications')
const internalGetCustomControllerFactories = require('./utilities/getCustomControllerFactories')

const defaultLog = createLog('lib/serviceInterface')

module.exports = function createServiceInterface({
  config,
  log = defaultLog,
  resourceRelationshipParamsMap,
  serviceConfigurations: serviceConfigurationsInput,
  serviceOrder,
}) {
  log.info('removing inactive services')
  const serviceConfigurations = removeInactiveServices({
    config,
    serviceConfigurations: serviceConfigurationsInput,
  })
  log.info('create service specifications')
  const serviceSpecifications = createServiceSpecifications({
    log,
    resourceRelationshipParamsMap,
    serviceDefinitions: serviceConfigurations,
  })

  const getModelSpecifications = () => {
    return internalGetModelSpecifications({
      config,
      serviceOrder: serviceOrder || Object.keys(serviceSpecifications),
      serviceSpecifications,
    })
  }

  const getCustomControllerFactories = () => {
    return internalGetCustomControllerFactories(serviceSpecifications)
  }

  const getOperationSpecifications = () => {
    return internalGetOperationSpecifications({
      serviceSpecifications,
    })
  }

  const createModels = ({ elasticsearch, inMemoryDb, sequelize }) => {
    return internalCreateModels({
      config,
      elasticsearch,
      inMemoryDb,
      log,
      modelSpecifications: getModelSpecifications(),
      sequelize,
    })
  }

  const createOperations = ({
    fileInteractor,
    integrations,
    models,
    serviceInteractor,
  }) => {
    return internalCreateOperations({
      config,
      customControllerFactories: getCustomControllerFactories(),
      fileInteractor,
      integrations,
      log,
      models,
      operationSpecifications: getOperationSpecifications(),
      serviceInteractor,
    })
  }

  return {
    createModels,
    createOperations,
    getCustomControllerFactories,
    getModelSpecifications,
    getOperationSpecifications,
  }
}
