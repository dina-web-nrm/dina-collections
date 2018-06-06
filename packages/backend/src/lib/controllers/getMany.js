const createArrayResponse = require('./transformations/createArrayResponse')
const transformOutput = require('./transformations/outputObject')
const buildIncludeArray = require('./relationshipsUtilities/buildIncludeArray')
const extractRelationships = require('./relationshipsUtilities/extractRelationships')

module.exports = function getMany({ operation, models }) {
  const { includeRelations, relations, resource, filters } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  return ({ request }) => {
    const {
      queryParams: {
        filter: filterInput,
        limit,
        offset,
        relationships: queryParamRelationships = '',
      },
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
        filters,
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
