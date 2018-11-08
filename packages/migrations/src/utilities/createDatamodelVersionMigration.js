const setupServiceInteractor = require('./setupServiceInteractor')

module.exports = function createDatamodelVersionMigration({
  nextVersion,
  prevVersion,
}) {
  const up = () => {
    return setupServiceInteractor().then(serviceInteractor => {
      return serviceInteractor.call({
        operationType: 'create',
        request: {
          body: {
            data: {
              attributes: {
                dataModelVersion: nextVersion,
                status: 'success',
              },
            },
          },
        },
        resource: 'dataModelMigrationLog',
      })
    })
  }

  const down = () => {
    return setupServiceInteractor().then(serviceInteractor => {
      return serviceInteractor.call({
        operationType: 'create',
        request: {
          body: {
            data: {
              attributes: {
                dataModelVersion: prevVersion,
                status: 'success',
              },
            },
          },
        },
        resource: 'dataModelMigrationLog',
      })
    })
  }

  return {
    down,
    up,
  }
}
