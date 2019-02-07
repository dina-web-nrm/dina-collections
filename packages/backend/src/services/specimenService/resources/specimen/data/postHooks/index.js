const {
  createRegisterResourceActivityHook,
} = require('../../../../../historyService/serviceInteractions')

const {
  createIndexJob,
  rebuildInProgress,
} = require('../../../../../searchService/serviceInteractions')

const indexHook = ({ item, serviceInteractor }) => {
  return Promise.resolve().then(() => {
    const id = item && item.id
    const request = {
      body: {
        data: {
          attributes: {
            ids: [id],
          },
        },
      },
    }
    return serviceInteractor
      .updateView({
        request,
        resource: 'searchSpecimen',
      })
      .then(() => {
        return rebuildInProgress({ serviceInteractor }).then(inProgress => {
          if (!inProgress) {
            return null
          }
          return createIndexJob({
            consolidateJobs: false,
            priority: 1,
            searchSpecimenIds: [id],
            serviceInteractor,
          })
        })
      })
  })
}

exports.create = [
  indexHook,
  createRegisterResourceActivityHook({
    action: 'create',
    includeDiff: true,
    includeSnapshot: true,
    service: 'specimenService',
  }),
]

exports.update = [
  indexHook,
  createRegisterResourceActivityHook({
    action: 'update',
    includeDiff: true,
    includeSnapshot: true,
    service: 'specimenService',
  }),
]

exports.del = [
  indexHook,
  createRegisterResourceActivityHook({
    action: 'delete',
    includeDiff: true,
    includeSnapshot: true,
    service: 'specimenService',
  }),
]
