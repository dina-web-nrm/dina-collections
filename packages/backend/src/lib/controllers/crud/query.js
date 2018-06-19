const createArrayResponse = require('../utilities/transformations/createArrayResponse')
const transformOutput = require('../utilities/transformations/outputObject')

module.exports = function queryController({ operation, models }) {
  const { aggregationSpecification, resource, filterSpecification } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  if (!model.buildWhereQuery) {
    throw new Error(`Model for ${resource} dont support query`)
  }

  return ({ request }) => {
    const {
      body: {
        data: { attributes: { aggregations, idsOnly, limit, offset, query } },
      },
    } = request

    return model
      .buildWhereQuery({
        aggregations,
        aggregationSpecification,
        filterSpecification,
        query,
      })
      .then(where => {
        return model
          .getWhere({
            aggregations,
            aggregationSpecification,
            idsOnly,
            limit,
            offset,
            raw: false,
            where,
          })
          .then(({ items }) => {
            return createArrayResponse({
              items: items.map(item => {
                return transformOutput(item)
              }),
              type: resource,
            })
          })
      })
  }
}
