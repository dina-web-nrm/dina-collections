import createMultipleSearchTagsSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/multipleSearchTagsSpecification'
import createTagTypeSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/tagTypeSpecification'

const multipleSearchTagsSpecification = createMultipleSearchTagsSpecification({
  matchFilterFunctionName: 'matchTaxonomyTags',
  searchFilterFunctionName: 'searchTaxonomyTags',
  sectionName: 'taxonomy',
  tagTypeAggregationFunctionName: 'aggregateTaxonomyTagTypes',
  tagValuesAggregationFunctionName: 'aggregateTaxonomyTagValues',
  tagValuesFieldName: 'taxonomy.tagValues',
})

const tagTypeSpecification = createTagTypeSpecification({
  aggregationFunctionName: 'aggregateTaxonomyTagTypes',
  fieldName: 'taxonomy.tagType',
  matchFilterFunctionName: 'matchTaxonomyTags',
  sectionName: 'taxonomy',
})

export default [...multipleSearchTagsSpecification, ...tagTypeSpecification]
