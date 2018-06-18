const createArrayResponse = require('../utilities/transformations/createArrayResponse')
const transformOutput = require('../utilities/transformations/outputObject')

module.exports = function queryController({ operation, models }) {
  const { resource, filterSpecifications } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  if (!model.buildWhereQuery) {
    throw new Error(`Model for ${resource} dont support query`)
  }

  return ({ request }) => {
    const {
      body: { data: { attributes: { aggregations, limit, offset, filters } } },
    } = request

    return model
      .buildWhereQuery({
        aggregations,
        filters,
        filterSpecifications,
      })
      .then(where => {
        return model
          .getWhere({
            limit,
            offset,
            raw: false,
            where,
          })
          .then(items => {
            return createArrayResponse({
              items: items.map(item => {
                return transformOutput({ document: item, id: item.id })
              }),
              type: resource,
            })
          })
      })
  }
}
