const createArrayResponse = require('../utilities/transformations/createArrayResponse')
const buildIncludeArray = require('../utilities/relationships/buildIncludeArray')
const extractRelationships = require('../utilities/relationships/extractRelationships')
const getAncestors = require('../utilities/getAncestors')

module.exports = function getMany({ operation, models, serviceInteractor }) {
  const {
    filterSpecification,
    includeRelations,
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

  return ({ request }) => {
    const {
      queryParams: {
        excludeFields: excludeFieldsInput,
        filter: filterInput,
        includeFields: includeFieldsInput,
        limit = 10,
        offset = 0,
        relationships: queryParamRelationshipsInput = '',
        sort: sortInput,
      } = {},
    } = request

    const fetchAncestors =
      filterInput && filterInput.ancestorsToId !== undefined
    const queryParamRelationships = fetchAncestors
      ? 'parent'
      : queryParamRelationshipsInput

    let include
    if (
      relations &&
      includeRelations &&
      (queryParamRelationships || fetchAncestors)
    ) {
      include = buildIncludeArray({
        models,
        queryParamRelationships,
        relations,
      })
    }
    let promise
    if (fetchAncestors) {
      promise = getAncestors({
        id: filterInput.ancestorsToId,
        include,
        includeRelations,
        model,
        queryParamRelationships: 'parent',
        relations,
      })
    } else {
      promise = model.getWhere({
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
    }
    return promise.then(({ items, meta } = {}) => {
      return createArrayResponse({
        items: items.map(item => {
          const relationships =
            includeRelations &&
            extractRelationships({
              item,
              queryParamRelationships,
              relations,
            })
          if (!relationships || fetchAncestors) {
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
