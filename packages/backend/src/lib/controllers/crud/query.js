const createArrayResponse = require('../utilities/transformations/createArrayResponse')

module.exports = function queryController({ operation, models }) {
  const {
    aggregationSpecification,
    filterSpecification,
    resource,
    selectableFields,
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
        filterInput,
        filterSpecification,
        limit,
        offset,
        query,
        scroll,
        scrollId,
        selectableFields,
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
