const buildItemFromElasticsearch = ({ item, resource }) => {
  const { doc_count: count, key } = item
  return {
    attributes: {
      count,
      key,
      type: resource,
    },
    id: key,
    internals: {},
  }
}

module.exports = function extractItemsFromAggregations({
  aggregations: aggregationsInput = [],
  aggregationSpecification,
  result,
}) {
  const { aggregations } = aggregationSpecification
  const aggregationResult = []

  aggregationsInput.forEach(
    ({ aggregationFunction: aggregationFunctionName }) => {
      const { key, resource } = aggregations[aggregationFunctionName]
      if (!key) {
        throw new Error('Aggregation missing required key')
      }

      if (!buildItemFromElasticsearch) {
        throw new Error('Aggregation missing required key')
      }

      const aggregation = result.aggregations && result.aggregations[key]

      if (aggregation) {
        const { buckets } = aggregation
        buckets.forEach(item => {
          aggregationResult.push(buildItemFromElasticsearch({ item, resource }))
        })
      }
    }
  )
  return aggregationResult
}
