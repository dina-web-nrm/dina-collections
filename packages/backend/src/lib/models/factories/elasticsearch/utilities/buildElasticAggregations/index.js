module.exports = function buildElasticAggregations({
  aggregations: aggregationsInput = [],
  aggregationSpecification,
}) {
  const { aggregations } = aggregationSpecification

  return aggregationsInput.reduce(
    (
      elasticAggregations,
      { aggregationFunction: aggregationFunctionName, options }
    ) => {
      const { elasticsearch: aggregationFunction, key } = aggregations[
        aggregationFunctionName
      ]
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
          options,
        }),
      }
    },
    {}
  )
}
