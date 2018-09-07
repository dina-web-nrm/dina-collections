const performExport = require('./performExport')

const performExportHook = ({ fileInteractor, item, serviceInteractor }) => {
  return performExport({
    fileInteractor,
    item,
    serviceInteractor,
  })
    .then(({ filePath }) => {
      return serviceInteractor.call({
        operationId: 'exportJobSetJobSuccess',
        request: {
          body: {
            data: {
              attributes: {
                exportIds: [],
                filePath,
              },
            },
          },
          pathParams: {
            id: item.id,
          },
        },
      })
    })
    .catch(err => {
      return serviceInteractor
        .call({
          operationId: 'exportJobSetJobFailed',
          request: {
            body: {
              data: {
                attributes: {
                  error: err.stack,
                  exportIds: [],
                },
              },
            },
            pathParams: {
              id: item.id,
            },
          },
        })
        .then(() => {
          throw err
        })
    })
}

const registerJobHook = ({ item, serviceInteractor }) => {
  return serviceInteractor.detachedCall({
    operationId: 'exportJobStartJob',
    request: {
      body: { data: {} },
      pathParams: {
        id: item.id,
      },
    },
  })
}

exports.create = [registerJobHook]

exports.startJob = [performExportHook]
