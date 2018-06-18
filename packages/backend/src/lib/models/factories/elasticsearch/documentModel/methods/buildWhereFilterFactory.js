// const buildElasticAggregations = require('../../utilities/buildElasticAggregations')
const buildElasticQuery = require('../../utilities/buildElasticQuery')

const buildQueryFromFilters = ({ filterInput }) => {
  if (!filterInput) {
    return null
  }
  const and = Object.keys(filterInput).map(key => {
    return {
      filter: {
        filterFunction: key,
        value: filterInput[key],
      },
    }
  })

  return {
    and,
  }
}

module.exports = function buildWhereFilterFactory() {
  return function buildQueryFilter({ filterInput, filterSpecification } = {}) {
    return Promise.resolve().then(() => {
      const query = buildQueryFromFilters({
        filterInput,
      })
      // const {
      //   filters,
      //   // aggregations,
      //   // limit,
      //   // offset
      // } = query

      const elasticQuery = !query
        ? {}
        : buildElasticQuery({
            filterSpecification,
            query,
          })
      // const elasticAggregations = buildElasticAggregations({
      //   aggregations,
      //   aggregationSpecification,
      // })

      // const elaticBody = {
      //   aggregations: elasticAggregations,
      //   query: elasticQuery,
      // }
      return {
        query: elasticQuery,
      }
    })
  }
}
