const createRegisterResourceActivityHook = require('../../../../../../lib/data/hooks/factories/createRegisterResourceActivityHook')

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
    return serviceInteractor.requestUpdateView({
      request,
      resource: 'searchSpecimen',
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
