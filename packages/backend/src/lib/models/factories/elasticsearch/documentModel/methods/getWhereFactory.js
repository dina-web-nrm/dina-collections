const extractItemsFromResult = require('../../utilities/extractItemsFromResult')
const extractItemsFromAggregations = require('../../utilities/extractItemsFromAggregations')

module.exports = function getWhereFactory({ Model, elasticsearch }) {
  return function getWhere({
    aggregations,
    aggregationSpecification,
    idsOnly,
    limit = 10,
    offset = 0,
    where = {},
  }) {
    return elasticsearch
      .search({
        _source: idsOnly ? ['id'] : undefined,
        body: where,
        from: offset,
        index: Model.index,
        size: limit,
        type: Model.name,
      })
      .then(res => {
        if (aggregations && Object.keys(aggregations).length) {
          return extractItemsFromAggregations({
            aggregations,
            aggregationSpecification,
            result: res,
          })
        }

        return extractItemsFromResult({
          result: res,
        })
      })
  }
}
