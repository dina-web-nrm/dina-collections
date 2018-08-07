const createArrayResponse = require('../utilities/transformations/createArrayResponse')

module.exports = function queryController({ operation, models }) {
  const {
    aggregationSpecification,
    resource,
    fieldsSpecification,
    filterSpecification,
    sortSpecification,
  } = operation
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
            fields: fieldsInput,
            filter: filterInput,
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
        fieldsInput,
        fieldsSpecification,
        filterInput,
        filterSpecification,
        idsOnly,
        limit,
        offset,
        query,
        scroll,
        scrollId,
        sortSpecification,
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
