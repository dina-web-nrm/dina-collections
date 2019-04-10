const backendSetupServiceInteractor = require('backend/src/lib/bootstrap/bootstrapServiceInteractor')
const serviceConfigurations = require('backend/src/serviceConfigurations')

module.exports = function setupServiceInteractor({
  apiVersion,
  dataModelVersion,
} = {}) {
  const env = process.env.NODE_ENV

  return backendSetupServiceInteractor({
    apiVersion,
    dataModelVersion,
    env,
    serviceConfigurations,
  })
}
