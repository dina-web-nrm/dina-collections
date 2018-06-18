module.exports = function buildElasticAggregations({
  aggregations = [],
  aggregationFunctions,
}) {
  return aggregations.reduce(
    (
      elasticAggregations,
      { aggregationFunction: aggregationFunctionName, value, key }
    ) => {
      const aggregationFunction = aggregationFunctions[aggregationFunctionName]
      if (!key) {
        throw new Error('Aggregation missing required key')
      }
      if (!aggregationFunction) {
        throw new Error(
          `Aggregation function not found for ${aggregationFunctionName}`
        )
      }
      return {
        ...elasticAggregations,
        [key]: aggregationFunction({
          value,
        }),
      }
    },
    {}
  )
}
