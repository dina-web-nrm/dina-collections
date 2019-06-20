const fieldPath = 'attributes.tags.agentTags'
const filterFunction = 'searchNormalizedAgentTags'
const resource = 'agentTag'
const typeAggregationFunction = 'aggregateAgentTagTypes'
const valueAggregationFunction = 'aggregateAgentTagValues'

module.exports = {
  fieldPath,
  filterFunction,
  resource,
  typeAggregationFunction,
  valueAggregationFunction,
}
