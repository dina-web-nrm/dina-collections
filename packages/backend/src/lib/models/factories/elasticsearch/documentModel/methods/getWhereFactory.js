const getWhereWrapper = require('../../../wrappers/methods/getWhere')

const extractMetaFromResult = require('../../utilities/extractMetaFromResult')
const extractItemsFromResult = require('../../utilities/extractItemsFromResult')
const extractItemsFromAggregations = require('../../utilities/extractItemsFromAggregations')

const buildWhere = ({
  aggregations,
  aggregationSpecification,
  buildWhereFilter,
  buildWhereQuery,
  filterInput,
  filterSpecification,
  query,
}) => {
  if (query) {
    return buildWhereQuery({
      aggregations,
      aggregationSpecification,
      filterSpecification,
      query,
    })
  }
  if (filterInput) {
    return buildWhereFilter({
      filterInput,
      filterSpecification,
    })
  }

  throw new Error('Provide either query or filterInput')
}

module.exports = function getWhereFactory({
  buildWhereFilter,
  buildWhereQuery,
  elasticsearch,
  Model,
}) {
  return getWhereWrapper(
    ({
      aggregations,
      aggregationSpecification,
      filterInput = {},
      filterSpecification = {},
      idsOnly,
      limit = 10,
      offset = 0,
      query,
      scroll,
      scrollId,
    }) => {
      return buildWhere({
        aggregations,
        aggregationSpecification,
        buildWhereFilter,
        buildWhereQuery,
        filterInput,
        filterSpecification,
        query,
      }).then(where => {
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
            sort: '_id:desc',
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
      })
    }
  )
}
