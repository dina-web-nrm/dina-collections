import createMultipleSearchTagsSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/multipleSearchTagsSpecification'

const multipleSearchTagsSpecifications = createMultipleSearchTagsSpecification({
  matchFilterFunctionName: 'matchLocationTags',
  searchFilterFunctionName: 'searchLocationTags',
  sectionName: 'locality.localities',
  tagTypeAggregationFunctionName: 'aggregateLocationTagTypes',
  tagValuesAggregationFunctionName: 'aggregateLocationTagValues',
  tagValuesFieldName: 'locality.localities.tagValues',
})

const higherGeographySpecifications = createMultipleSearchTagsSpecification({
  matchFilterFunctionName: 'matchHigherGeographyTags',
  searchFilterFunctionName: 'searchHigherGeographyTags',
  sectionName: 'locality.higherGeography',
  tagTypeAggregationFunctionName: 'aggregateHigherGeographyTagTypes',
  tagValuesAggregationFunctionName: 'aggregateHigherGeographyTagValues',
  tagValuesFieldName: 'locality.higherGeography.tagValues',
})

export default [
  ...multipleSearchTagsSpecifications,
  ...higherGeographySpecifications,
]
