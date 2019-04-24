const {
  createEnsureDataCorrectVersion,
} = require('../../../../serviceConfigurations/migrationService/preHooks')

module.exports = function createPreHooks({
  config,
  customHooks = [],
  operationSpecification,
  serviceInteractor,
}) {
  return [
    createEnsureDataCorrectVersion({
      config,
      dataModelVersion: config.dataModel.version,
      method: operationSpecification.method,
      resource: operationSpecification.resource,
      serviceInteractor,
    }),
    ...customHooks,
  ]
}
