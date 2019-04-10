module.exports = function buildElasticAggregations({
  aggregations: aggregationsInput = [],
  aggregationSpecification,
}) {
  const { aggregations } = aggregationSpecification
  let highlight
  const elasticAggregations = aggregationsInput.reduce(
    (obj, { aggregationFunction: aggregationFunctionName, input }) => {
      const { elasticsearch: aggregationFunction, createHighlight, key } =
        aggregations[aggregationFunctionName] || {}
      if (!aggregationFunction) {
        throw new Error(
          `Aggregation function not found for ${aggregationFunctionName}`
        )
      }
      if (!key) {
        throw new Error('Aggregation missing required key')
      }

      if (createHighlight) {
        highlight = createHighlight({ highlight, input })
      }

      const aggregation = aggregationFunction({
        input,
      })

      if (!aggregation) {
        return obj
      }

      return {
        ...obj,
        [key]: aggregation,
      }
    },
    {}
  )
  return {
    elasticAggregations,
    highlight,
  }
}
