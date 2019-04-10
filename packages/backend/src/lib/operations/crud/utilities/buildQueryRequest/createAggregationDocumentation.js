module.exports = function createAggregationDocumentation({
  aggregationSpecification,
}) {
  const aggregationsObject = aggregationSpecification.aggregations || {}

  const aggregationKeys = Object.keys(aggregationsObject)

  const aggregations = aggregationKeys.map(aggregationKey => {
    return ` ***${aggregationKey}*** <br/> ${
      aggregationsObject[aggregationKey].description
    } <br/>`
  })

  const aggregationDescription = !aggregations.length
    ? ''
    : `
**Available aggregation functions:**
***
<br/>

${aggregations.join(' <br/> ')}

  `
  return aggregationDescription
}
