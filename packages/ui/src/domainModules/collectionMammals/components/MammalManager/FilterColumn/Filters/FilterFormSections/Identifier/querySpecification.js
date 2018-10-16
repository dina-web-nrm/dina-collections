import createTagSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/tagSpecification'

export default createTagSpecification({
  matchFilterFunctionName: 'matchIdentifierTags',
  searchFilterFunctionName: 'searchIdentifierTags',
  sectionName: 'identifier',
  tagTypeAggregationFunctionName: 'aggregateIdentifierTagTypes',
  tagTypesFieldName: 'identifier.tagTypes',
  tagValuesAggregationFunctionName: 'aggregateIdentifierTagValues',
  tagValuesFieldName: 'identifier.tagValues',
})
