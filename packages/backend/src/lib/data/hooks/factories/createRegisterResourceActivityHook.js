const createLog = require('../../../../utilities/log')

const log = createLog(
  'lib/data/hooks/factories/createRegisterResourceActivityHook'
)

module.exports = function createRegisterResourceActivityHook({
  action,
  service,
}) {
  return ({ item, requestId, resource, serviceInteractor, user }) => {
    return Promise.resolve().then(() => {
      const { id } = item
      const request = {
        body: {
          data: {
            attributes: {
              action,
              requestId,
              resource,
              resourceId: id,
              service,
              userId: user && user.id,
            },
          },
        },
      }
      return serviceInteractor
        .create({
          request,
          resource: 'resourceActivity',
        })
        .catch(err => {
          log.err(err.stack)
        })
    })
  }
}
