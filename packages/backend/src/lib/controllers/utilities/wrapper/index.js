const createLog = require('../../../../utilities/log')
const createObjectResponse = require('../transformations/createObjectResponse')
const extractRelationships = require('../relationships/extractRelationships')
const createArrayResponse = require('../transformations/createArrayResponse')
const createInterceptors = require('../createInterceptors')
const applyInterceptors = require('../applyInterceptors')
const applyHooks = require('../applyHooks')

module.exports = function createControllerWrapper({
  requiredModelMethods = [],
  enableInterceptors = false,
  enablePostHooks = false,
  enablePreHooks = false,
  fileInteractor,
  models,
  operation,
  responseFormat,
  responseSuccessStatus = 200,
  serviceInteractor,
}) {
  const {
    filterSpecification,
    includeRelations,
    interceptors: interceptorsInput,
    postHooks: postHooksInput,
    preHooks: preHooksInput,
    relations,
    resource,
    operationId,
  } = operation
  const model = models[resource]

  if (!operationId) {
    throw new Error(`Operation id missing for controller`)
  }

  if (!model) {
    throw new Error('Model is required')
  }

  if (!serviceInteractor) {
    throw new Error('Service interactor is required')
  }

  requiredModelMethods.forEach(method => {
    if (!model[method]) {
      throw new Error(`Missing required model method: ${method}`)
    }
  })

  if (!['object', 'array'].includes(responseFormat)) {
    throw new Error(`Unknown response format: ${responseFormat}`)
  }

  if (!enablePreHooks && preHooksInput) {
    throw new Error(`Prehooks not enable for ${operationId} controller`)
  }

  if (!enablePostHooks && postHooksInput) {
    throw new Error(`Posthooks not enable for ${operationId} controller`)
  }

  if (!enableInterceptors && interceptorsInput) {
    throw new Error(`Interceptors not enable for ${operationId} controller`)
  }

  const responseIsArray = responseFormat === 'array'
  const responseIsObject = responseFormat === 'object'

  const interceptors = enableInterceptors
    ? createInterceptors({
        customInterceptors: interceptorsInput,
        filterSpecification,
      })
    : []

  const preHooks = enablePreHooks ? preHooksInput : []
  const postHooks = enablePostHooks ? postHooksInput : []

  const log = createLog(`controller/${operationId}`)

  return function wrapper(controllerHandler) {
    return function requestHandler({
      request: originalRequest,
      user,
      requestId,
    }) {
      log.debug(`Called with request id: ${requestId}`)
      return applyHooks({
        fileInteractor,
        hooks: preHooks,
        log,
        request: originalRequest,
        requestId,
        resource,
        serviceInteractor,
        user,
      })
        .then(() => {
          return applyInterceptors({
            interceptors,
            log,
            model,
            models,
            operation,
            request: originalRequest,
            serviceInteractor,
          }).then(
            ({
              items: itemsFromInterceptors,
              item: itemFromInterceptors,
              meta: metaFromInterceptors,
              request,
            }) => {
              if (responseIsArray && itemsFromInterceptors) {
                return Promise.resolve({
                  items: itemsFromInterceptors,
                  meta: metaFromInterceptors,
                  request,
                })
              }
              if (responseIsObject && itemFromInterceptors) {
                return Promise.resolve({
                  item: itemFromInterceptors,
                  meta: metaFromInterceptors,
                  request,
                })
              }
              return Promise.resolve()
                .then(() => {
                  return controllerHandler({
                    log,
                    model,
                    models,
                    request,
                    requestId,
                    serviceInteractor,
                    user,
                  })
                })
                .then(controllerResponse => {
                  return {
                    ...controllerResponse,
                    request,
                  }
                })
            }
          )
        })
        .then(({ item, items, meta, request }) => {
          return applyHooks({
            fileInteractor,
            hooks: postHooks,
            item,
            items,
            log,
            requestId,
            resource,
            serviceInteractor,
            user,
          }).then(() => {
            const {
              queryParams: { relationships: queryParamRelationships = '' } = {},
            } = request

            if (responseIsObject) {
              const relationships =
                includeRelations &&
                extractRelationships({
                  item,
                  queryParamRelationships,
                  relations,
                })

              return createObjectResponse({
                data: item,
                id: item.id,
                relationships,
                status: responseSuccessStatus,
                type: resource,
              })
            }

            return createArrayResponse({
              items: items.map(arrayItem => {
                const relationships =
                  includeRelations &&
                  extractRelationships({
                    item: arrayItem,
                    queryParamRelationships,
                    relations,
                  })
                if (!relationships) {
                  return arrayItem
                }

                return {
                  ...arrayItem,
                  relationships,
                }
              }),
              meta,
              type: resource,
            })
          })
        })
    }
  }
}
