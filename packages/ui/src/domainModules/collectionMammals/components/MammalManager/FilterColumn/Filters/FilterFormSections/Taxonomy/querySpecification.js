import createTagSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/tagSpecification'

export default createTagSpecification({
  matchFilterFunctionName: 'matchTaxonomyTags',
  searchFilterFunctionName: 'searchTaxonomyTags',
  sectionName: 'taxonomy',
  tagTypeAggregationFunctionName: 'aggregateTaxonomyTagTypes',
  tagValuesAggregationFunctionName: 'aggregateTaxonomyTagValues',
  tagValuesFieldName: 'taxonomy.tagValues',
})
