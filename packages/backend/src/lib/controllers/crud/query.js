const createArrayResponse = require('../utilities/transformations/createArrayResponse')

module.exports = function queryController({ operation, models }) {
  const { aggregationSpecification, resource, filterSpecification } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  if (!model.buildWhereQuery) {
    throw new Error(`Model for ${resource} dont support query`)
  }

  if (!model.getWhere) {
    throw new Error(`Model missing required method: getWhere for ${resource}`)
  }

  return ({ request }) => {
    const {
      body: {
        data: {
          attributes: {
            aggregations,
            idsOnly,
            limit,
            offset,
            query,
            scroll,
            scrollId,
          },
        },
      },
    } = request

    return model
      .getWhere({
        aggregations,
        aggregationSpecification,
        filterSpecification,
        idsOnly,
        limit,
        offset,
        query,
        raw: false,
        scroll,
        scrollId,
      })
      .then(({ items, meta }) => {
        return createArrayResponse({
          items,
          meta,
          type: resource,
        })
      })
  }
}
