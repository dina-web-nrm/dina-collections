const createObjectResponse = require('../transformations/createObjectResponse')
const extractRelationships = require('../relationships/extractRelationships')
const createArrayResponse = require('../transformations/createArrayResponse')
const createInterceptors = require('../createInterceptors')
const applyInterceptors = require('../applyInterceptors')
const applyHooks = require('../applyHooks')

module.exports = function createControllerWrapper({
  fileInteractor,
  model,
  models,
  operation,
  responseFormat = 'object',
  responseSuccessStatus = 200,
  serviceInteractor,
  useInterceptors = false,
  usePostHooks = false,
  usePreHooks = false,
}) {
  console.log('Add checks for all required params. Use schema?')
  if (!['object', 'array'].includes(responseFormat)) {
    throw new Error(`Unknown response format: ${responseFormat}`)
  }

  const responseIsArray = responseFormat === 'array'
  const responseIsObject = responseFormat === 'object'

  const {
    filterSpecification,
    includeRelations,
    interceptors: interceptorsInput,
    postHooks: postHooksInput,
    preHooks: preHooksInput,
    relations,
    resource,
  } = operation

  const interceptors = useInterceptors
    ? createInterceptors({
        customInterceptors: interceptorsInput,
        filterSpecification,
      })
    : []

  const preHooks = usePreHooks && preHooksInput ? preHooksInput : []
  const postHooks = usePostHooks && postHooksInput ? postHooksInput : []

  return function wrapper(controllerHandler) {
    return function requestHandler({
      request: originalRequest,
      user,
      requestId,
    }) {
      return applyHooks({
        fileInteractor,
        hooks: preHooks,
        request: originalRequest,
        requestId,
        resource,
        serviceInteractor,
        user,
      })
        .then(() => {
          return applyInterceptors({
            interceptors,
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
              return controllerHandler({
                request: originalRequest,
                requestId,
                user,
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
            requestId,
            resource,
            serviceInteractor,
            user,
          }).then(() => {
            if (responseIsObject) {
              return createObjectResponse({
                data: item,
                id: item.id,
                status: responseSuccessStatus,
                type: resource,
              })
            }
            const {
              queryParams: { relationships: queryParamRelationships = '' } = {},
            } = request

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
