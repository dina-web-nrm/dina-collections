const createArrayResponse = require('../utilities/transformations/createArrayResponse')
const transformOutput = require('../utilities/transformations/outputObject')
const buildIncludeArray = require('../utilities/relationships/buildIncludeArray')
const extractRelationships = require('../utilities/relationships/extractRelationships')

module.exports = function getMany({ operation, models }) {
  const {
    includeRelations,
    relations,
    resource,
    filterSpecificationMap,
  } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
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
      .buildWhereFilter({
        filterInput,
        filterSpecificationMap,
      })
      .then(where => {
        return model
          .getWhere({
            include,
            limit,
            offset,
            raw: false,
            where,
          })
          .then(items => {
            return createArrayResponse({
              items: items.map(item => {
                const transformedItem = transformOutput(item)
                const relationships =
                  includeRelations &&
                  extractRelationships({
                    fetchedResource: item,
                    queryParamRelationships,
                    relations,
                  })
                if (!relationships) {
                  return transformedItem
                }

                return {
                  ...transformedItem,
                  relationships,
                }
              }),
              type: resource,
            })
          })
      })
  }
}
