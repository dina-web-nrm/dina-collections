const { ensureDataSyncedWithVersion } = require('../serviceInteractions')

const whitelistedMethods = ['GET', 'get']
const whitelistedResources = ['dataModelMigrationLog']

exports.createEnsureDataCorrectVersion = ({
  dataModelVersion,
  method,
  resource,
  serviceInteractor,
}) => {
  return function ensureDataCorrectVersionPreHook() {
    return Promise.resolve().then(() => {
      if (whitelistedMethods.includes(method)) {
        return true
      }

      if (whitelistedResources.includes(resource)) {
        return true
      }

      return ensureDataSyncedWithVersion({
        dataModelVersion,
        serviceInteractor,
      }).then(() => {
        return true
      })
    })
  }
}
