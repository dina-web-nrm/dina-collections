import createTagSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/tagSpecification'

export default createTagSpecification({
  matchFilterFunctionName: 'matchStorageLocationTags',
  searchFilterFunctionName: 'searchStorageLocationTags',
  sectionName: 'storage',
  tagTypeAggregationFunctionName: 'aggregateStorageLocationTagTypes',
  tagValuesAggregationFunctionName: 'aggregateStorageLocationTagValues',
  tagValuesFieldName: 'storage.tagValues',
})
