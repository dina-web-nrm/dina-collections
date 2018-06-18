const buildElasticAggregations = require('./buildElasticAggregations')
const buildElasticQuery = require('./buildElasticQuery')
const filterFunctions = require('./filterFunctions')
const aggregationFunctions = require('./aggregationFunctions')

module.exports = function buildQueryFilterFactory() {
  return function buildQueryFilter({ aggregations = {}, filters = {} } = {}) {
    return Promise.resolve().then(() => {
      // const {
      //   filters,
      //   // aggregations,
      //   // limit,
      //   // offset
      // } = query

      const elasticQuery = buildElasticQuery({ filterFunctions, filters })
      const elasticAggregations = buildElasticAggregations({
        aggregationFunctions,
        aggregations,
      })

      const elaticBody = {
        aggregations: elasticAggregations,
        query: elasticQuery,
      }
      return elaticBody
    })
  }
}
