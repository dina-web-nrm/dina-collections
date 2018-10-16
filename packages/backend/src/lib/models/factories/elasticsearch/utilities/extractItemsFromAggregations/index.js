const buildItemFromElasticsearch = ({ item, resource }) => {
  const { doc_count: count, key, ...rest } = item
  return {
    attributes: {
      count,
      key,
      type: resource,
      ...rest,
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
      const { key, resource, extractItems } = aggregations[
        aggregationFunctionName
      ]
      if (!key) {
        throw new Error('Aggregation missing required key')
      }

      if (!buildItemFromElasticsearch) {
        throw new Error('Aggregation missing required key')
      }

      const aggregation = result.aggregations && result.aggregations[key]

      let items = []
      if (extractItems) {
        items = extractItems({ key, result })
      } else if (aggregation) {
        items = aggregation.buckets
      }

      items.forEach(item => {
        aggregationResult.push(buildItemFromElasticsearch({ item, resource }))
      })
    }
  )
  return aggregationResult
}
