const getWhereWrapper = require('../../../wrappers/methods/getWhere')
const asyncFilter = require('common/src/search/filter/async')

const buildWhere = ({
  buildWhereFilter,
  buildWhereQuery,
  filterInput,
  filterSpecification,
  query,
}) => {
  if (query) {
    return buildWhereQuery({
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
  Model,
}) {
  return getWhereWrapper(
    ({
      filterInput = {},
      filterSpecification = {},
      limit = 10,
      offset = 0,
      query: queryInput,
    }) => {
      return buildWhere({
        buildWhereFilter,
        buildWhereQuery,
        filterInput,
        filterSpecification,
        query: queryInput,
      }).then(where => {
        const { query, filterFunctions } = where
        const itemArray = Model.getArray()
        return asyncFilter({
          attributesPath: 'attributes',
          filterFunctions,
          items: itemArray,
          limit,
          offset,
          query,
          returnItems: true,
        }).then(items => {
          return {
            items,
          }
        })
      })
    }
  )
}
