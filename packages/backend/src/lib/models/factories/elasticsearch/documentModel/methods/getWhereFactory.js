const extractMetaFromResult = require('../../utilities/extractMetaFromResult')
const extractItemsFromResult = require('../../utilities/extractItemsFromResult')
const extractItemsFromAggregations = require('../../utilities/extractItemsFromAggregations')

module.exports = function getWhereFactory({ Model, elasticsearch }) {
  return function getWhere({
    aggregations,
    aggregationSpecification,
    idsOnly,
    limit = 10,
    offset = 0,
    scroll,
    scrollId,
    where = {},
  }) {
    let options = {
      scroll: scroll ? '30s' : undefined,
    }

    let methodName
    if (scrollId) {
      methodName = 'scroll'
      options = {
        ...options,
        scrollId,
      }
    } else {
      methodName = 'search'
      options = {
        ...options,
        _source: idsOnly ? ['id'] : undefined,
        body: where,
        from: offset,
        index: Model.index,
        size: limit,
        sort: ['id.raw'],
        type: Model.name,
      }
    }

    return elasticsearch[methodName](options).then(res => {
      const meta = extractMetaFromResult({ result: res })
      let items = []
      if (aggregations && Object.keys(aggregations).length) {
        items = extractItemsFromAggregations({
          aggregations,
          aggregationSpecification,
          result: res,
        })
      } else {
        items = extractItemsFromResult({
          result: res,
        })
      }

      return { items, meta }
    })
  }
}
