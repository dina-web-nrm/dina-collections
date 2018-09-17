const createArrayResponse = require('../utilities/transformations/createArrayResponse')
const buildIncludeArray = require('../utilities/relationships/buildIncludeArray')
const extractRelationships = require('../utilities/relationships/extractRelationships')
const applyInterceptors = require('../utilities/applyInterceptors')
const createInterceptors = require('../utilities/createInterceptors')

module.exports = function getMany({ operation, models, serviceInteractor }) {
  const {
    filterSpecification,
    includeRelations,
    interceptors: customInterceptors,
    relations,
    resource,
    selectableFields,
    sortableFields,
  } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  if (!model.buildWhereFilter) {
    throw new Error(
      `Model missing required method: buildWhereFilter for ${resource}`
    )
  }
  if (!model.getWhere) {
    throw new Error(`Model missing required method: getWhere for ${resource}`)
  }

  if (!model.getById) {
    throw new Error(`Model missing required method: getById for ${resource}`)
  }

  const interceptors = createInterceptors({
    customInterceptors,
    filterSpecification,
  })

  return ({ request: originalRequest }) => {
    return applyInterceptors({
      interceptors,
      model,
      models,
      operation,
      request: originalRequest,
      serviceInteractor,
    })
      .then(
        ({
          request,
          items: itemsFromInterceptors,
          meta: metaFromInterceptors,
        }) => {
          if (itemsFromInterceptors) {
            return Promise.resolve({
              items: itemsFromInterceptors,
              meta: metaFromInterceptors,
              request,
            })
          }
          const {
            queryParams: {
              excludeFields: excludeFieldsInput,
              filter: filterInput,
              includeFields: includeFieldsInput,
              limit = 10,
              offset = 0,
              relationships: queryParamRelationships = '',
              sort: sortInput,
            } = {},
          } = request

          let include
          if (relations && includeRelations) {
            include = buildIncludeArray({
              models,
              queryParamRelationships,
              relations,
            })
          }

          return model
            .getWhere({
              excludeFieldsInput,
              filterInput,
              filterSpecification,
              include,
              includeFieldsInput,
              limit,
              offset,
              selectableFields,
              serviceInteractor,
              sortableFields,
              sortInput,
            })
            .then(({ items, meta } = {}) => {
              return {
                items,
                meta,
                request,
              }
            })
        }
      )
      .then(({ items, meta, request }) => {
        const {
          queryParams: { relationships: queryParamRelationships = '' } = {},
        } = request

        return createArrayResponse({
          items: items.map(item => {
            const relationships =
              includeRelations &&
              extractRelationships({
                item,
                queryParamRelationships,
                relations,
              })
            if (!relationships) {
              return item
            }

            return {
              ...item,
              relationships,
            }
          }),
          meta,
          type: resource,
        })
      })
  }
}
