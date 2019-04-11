import createMultipleSearchTagsSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/multipleSearchTagsSpecification'
import createStringSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/stringSpecification'

const multipleSearchTagsSpecification = createMultipleSearchTagsSpecification({
  matchFilterFunctionName: 'matchTaxonomyTags',
  searchFilterFunctionName: 'searchTaxonomyTags',
  sectionName: 'taxonomy',
  tagTypeAggregationFunctionName: 'aggregateTaxonomyTagTypes',
  tagValuesAggregationFunctionName: 'aggregateTaxonomyTagValues',
  tagValuesFieldName: 'taxonomy.tagValues',
})

const stringSpecification = createStringSpecification({
  aggregationFunctionName: 'aggregateTaxonomyTagTypes',
  fieldName: 'taxonomy.tagType',
  matchFilterFunctionName: 'matchCuratorialTaxonRank',
  sectionName: 'taxonomy',
})

export default [...multipleSearchTagsSpecification, ...stringSpecification]
