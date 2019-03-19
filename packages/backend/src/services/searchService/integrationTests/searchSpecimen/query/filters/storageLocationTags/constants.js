const filterFunction = 'searchStorageLocationTags'
const tagPath = 'attributes.tags.storageLocationTags'
const resource = 'storageLocationTag'
const typeAggregationFunction = 'aggregateStorageLocationTagTypes'
const valueAggregationFunction = 'aggregateStorageLocationTagValues'

module.exports = {
  filterFunction,
  resource,
  tagPath,
  typeAggregationFunction,
  valueAggregationFunction,
}
