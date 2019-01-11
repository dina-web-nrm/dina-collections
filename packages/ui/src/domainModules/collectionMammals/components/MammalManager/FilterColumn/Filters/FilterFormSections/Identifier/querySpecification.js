import createMultipleSearchTagsSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/multipleSearchTagsSpecification'

export default createMultipleSearchTagsSpecification({
  matchFilterFunctionName: 'matchIdentifierTags',
  searchFilterFunctionName: 'searchIdentifierTags',
  sectionName: 'identifier',
  tagTypeAggregationFunctionName: 'aggregateIdentifierTagTypes',
  tagValuesAggregationFunctionName: 'aggregateIdentifierTagValues',
  tagValuesFieldName: 'identifier.tagValues',
})
