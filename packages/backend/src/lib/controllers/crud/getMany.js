const createArrayResponse = require('../utilities/transformations/createArrayResponse')
const buildIncludeArray = require('../utilities/relationships/buildIncludeArray')
const extractRelationships = require('../utilities/relationships/extractRelationships')

module.exports = function getMany({ operation, models }) {
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

  return ({ request }) => {
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
    if (relations && includeRelations && queryParamRelationships) {
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
        sortableFields,
        sortInput,
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
