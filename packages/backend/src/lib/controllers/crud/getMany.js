const createArrayResponse = require('../utilities/transformations/createArrayResponse')
const buildIncludeArray = require('../utilities/relationships/buildIncludeArray')
const extractRelationships = require('../utilities/relationships/extractRelationships')

module.exports = function getMany({ operation, models }) {
  const {
    includeRelations,
    relations,
    resource,
    filterSpecification,
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

  return ({ request }) => {
    const {
      queryParams: {
        filter: filterInput,
        limit = 10,
        offset = 0,
        relationships: queryParamRelationships = '',
      } = {},
    } = request

    let include
    if (relations && includeRelations && queryParamRelationships) {
      include = buildIncludeArray({
        models,
        queryParamRelationships,
        relations,
      })
    }

    return model
      .getWhere({
        filterInput,
        filterSpecification,
        include,
        limit,
        offset,
      })
      .then(({ items, meta } = {}) => {
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
