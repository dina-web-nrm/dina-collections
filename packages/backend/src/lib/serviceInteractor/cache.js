const createLog = require('../../utilities/log')

const log = createLog('lib/serviceInteractorCache')

const buildCacheKey = ({ operationType, resource, request = {} }) => {
  return `${resource}-${operationType}-${JSON.stringify(request)}`
}

module.exports = function createServiceInteractorCache({ serviceInteractor }) {
  const operationTypes = ['getMany', 'getOne']

  const serviceInteractorMethods = Object.keys(serviceInteractor)

  let cache = {}

  const emptyCache = () => {
    cache = {}
  }

  const serviceInteractions = serviceInteractorMethods.reduce(
    (methods, serviceInteractorMethod) => {
      if (!operationTypes.includes(serviceInteractorMethod)) {
        return {
          ...methods,
          [serviceInteractorMethod]: (...args) => {
            return serviceInteractor[serviceInteractorMethod](...args)
          },
        }
      }
      log.info(
        `Creating service interaction cache for operation: ${
          serviceInteractorMethod
        }`
      )

      return {
        ...methods,
        [serviceInteractorMethod]: ({ resource, request = {} }) => {
          const key = buildCacheKey({
            operationType: serviceInteractorMethod,
            request,
            resource,
          })

          if (cache[key]) {
            return Promise.resolve(cache[key])
          }

          return serviceInteractor[serviceInteractorMethod]({
            request,
            resource,
          }).then(res => {
            if (res) {
              cache[key] = res
            }
            return res
          })
        },
      }
    }
  )

  return { ...serviceInteractions, emptyCache }
}
