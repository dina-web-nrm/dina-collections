const applyHooks = require('../applyHooks')
const applyInterceptors = require('../applyInterceptors')
const createArrayResponse = require('../transformations/createArrayResponse')
const createInterceptors = require('../createInterceptors')
const createLog = require('../../../../utilities/log')
const createObjectResponse = require('../transformations/createObjectResponse')
const createPreHooks = require('../createPreHooks')
const extractRelationships = require('../relationships/extractRelationships')

module.exports = function createControllerWrapper({
  config,
  enableInterceptors = false,
  enablePostHooks = false,
  enablePreHooks = false,
  fileInteractor,
  models,
  operation,
  requiredModelMethods = [],
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

  const interceptors = createInterceptors({
    customInterceptors: (enableInterceptors && interceptorsInput) || [],
    filterSpecification,
  })

  const preHooks = createPreHooks({
    config,
    customHooks: (enablePreHooks && preHooksInput) || [],
    operation,
    serviceInteractor,
  })

  const postHooks = (enablePostHooks && postHooksInput) || []

  const log = createLog(`controller/${operationId}`)

  return function wrapper(controllerHandler) {
    return function requestHandler({
      request: originalRequest,
      user,
      requestId,
      ...rest
    }) {
      // log.debug(`Called with request id: ${requestId}`)
      return applyHooks({
        config,
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
              item: itemFromInterceptors,
              items: itemsFromInterceptors,
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
                    ...rest,
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
        .then(
          ({
            item,
            itemExternalRelationships,
            items,
            itemsExternalRelationships,
            meta,
            request,
          }) => {
            return applyHooks({
              config,
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
                queryParams: {
                  relationships: queryParamRelationships = '',
                } = {},
              } = request

              if (responseIsObject) {
                const relationships =
                  includeRelations &&
                  extractRelationships({
                    externalRelationships: itemExternalRelationships,
                    item,
                    queryParamRelationships,
                    relations,
                  })

                return createObjectResponse({
                  data: item,
                  id: item.id,
                  meta,
                  relationships,
                  status: responseSuccessStatus,
                  type: resource,
                })
              }

              return createArrayResponse({
                items: items.map((arrayItem, index) => {
                  const relationships =
                    includeRelations &&
                    extractRelationships({
                      externalRelationships: itemsExternalRelationships[index],
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
          }
        )
        .catch(err => {
          log.err('Received Error', err)
          throw err
        })
    }
  }
}
