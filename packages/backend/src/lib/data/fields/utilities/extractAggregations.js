module.exports = function extractAggregations({
  format = 'object',
  fieldsSpecification,
}) {
  const { fields } = fieldsSpecification
  const extractedAggregations = {}
  fields.forEach(field => {
    const { aggregations } = field
    if (aggregations) {
      Object.keys(aggregations).forEach(key => {
        const aggregation = aggregations[key]
        extractedAggregations[key] = { key, ...aggregation }
      })
    }
  })

  if (format === 'object') {
    return extractedAggregations
  }

  return Object.keys(extractedAggregations).map(aggregation => {
    return aggregation
  })
}
