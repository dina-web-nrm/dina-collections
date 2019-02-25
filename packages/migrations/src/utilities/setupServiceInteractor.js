const backendSetupServiceInteractor = require('backend/src/lib/bootstrap/setupServiceInteractor')
const serviceDefinitions = require('backend/src/services')
const serviceOrder = require('backend/src/services/serviceOrder')

module.exports = function setupServiceInteractor({
  apiVersion,
  dataModelVersion,
} = {}) {
  const env = process.env.NODE_ENV

  return backendSetupServiceInteractor({
    apiVersion,
    dataModelVersion,
    env,
    serviceDefinitions,
    serviceOrder,
  })
}
