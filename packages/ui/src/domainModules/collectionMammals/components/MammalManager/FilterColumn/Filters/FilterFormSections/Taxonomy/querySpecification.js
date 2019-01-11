import createMultipleSearchTagsSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/multipleSearchTagsSpecification'

export default createMultipleSearchTagsSpecification({
  matchFilterFunctionName: 'matchTaxonomyTags',
  searchFilterFunctionName: 'searchTaxonomyTags',
  sectionName: 'taxonomy',
  tagTypeAggregationFunctionName: 'aggregateTaxonomyTagTypes',
  tagValuesAggregationFunctionName: 'aggregateTaxonomyTagValues',
  tagValuesFieldName: 'taxonomy.tagValues',
})
