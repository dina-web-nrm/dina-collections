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
      const elasticQuery = buildElasticQuery({
        filterSpecification,
        query,
      })
      const { elasticAggregations, highlight } = buildElasticAggregations({
        aggregations,
        aggregationSpecification,
      })

      const elaticBody = {
        aggregations: elasticAggregations,
        highlight,
        query: elasticQuery,
      }

      return elaticBody
    })
  }
}
