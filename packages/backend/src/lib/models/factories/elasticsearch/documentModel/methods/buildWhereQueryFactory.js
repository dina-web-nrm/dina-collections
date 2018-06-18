const buildElasticAggregations = require('../../utilities/buildElasticAggregations')
const buildElasticQuery = require('../../utilities/buildElasticQuery')

module.exports = function buildWhereQueryFactory() {
  return function buildWhereQuery(
    {
      aggregationSpecification,
      filterSpecification,
      aggregations = [],
      query = {},
    } = {}
  ) {
    return Promise.resolve().then(() => {
      // const {
      //   filters,
      //   // aggregations,
      //   // limit,
      //   // offset
      // } = query

      const elasticQuery = buildElasticQuery({
        filterSpecification,
        query,
      })
      const elasticAggregations = buildElasticAggregations({
        aggregations,
        aggregationSpecification,
      })

      const elaticBody = {
        aggregations: elasticAggregations,
        query: elasticQuery,
      }

      return elaticBody
    })
  }
}
