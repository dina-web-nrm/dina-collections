import createMultipleSearchTagsSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/multipleSearchTagsSpecification'

export default createMultipleSearchTagsSpecification({
  matchFilterFunctionName: 'matchStorageLocationTags',
  searchFilterFunctionName: 'searchStorageLocationTags',
  sectionName: 'storage',
  tagTypeAggregationFunctionName: 'aggregateStorageLocationTagTypes',
  tagValuesAggregationFunctionName: 'aggregateStorageLocationTagValues',
  tagValuesFieldName: 'storage.tagValues',
})
