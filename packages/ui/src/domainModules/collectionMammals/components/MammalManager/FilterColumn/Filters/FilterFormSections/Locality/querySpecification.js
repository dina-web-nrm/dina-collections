import createTagSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/tagSpecification'

const tagSpecifications = createTagSpecification({
  matchFilterFunctionName: 'matchLocationTags',
  searchFilterFunctionName: 'searchLocationTags',
  sectionName: 'locality.localities',
  tagTypeAggregationFunctionName: 'aggregateLocationTagTypes',
  tagValuesAggregationFunctionName: 'aggregateLocationTagValues',
  tagValuesFieldName: 'locality.localities.tagValues',
})

const higherGeographySpecifications = createTagSpecification({
  matchFilterFunctionName: 'matchHigherGeographyTags',
  searchFilterFunctionName: 'searchHigherGeographyTags',
  sectionName: 'locality.higherGeography',
  tagTypeAggregationFunctionName: 'aggregateHigherGeographyTagTypes',
  tagValuesAggregationFunctionName: 'aggregateHigherGeographyTagValues',
  tagValuesFieldName: 'locality.higherGeography.tagValues',
})

export default [...tagSpecifications, ...higherGeographySpecifications]
