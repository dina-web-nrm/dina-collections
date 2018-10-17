import createTagSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/tagSpecification'

const tagSpecifications = createTagSpecification({
  matchFilterFunctionName: 'matchLocationTags',
  searchFilterFunctionName: 'searchLocationTags',
  sectionName: 'locality.localities',
  tagTypeAggregationFunctionName: 'aggregateLocationTagTypes',
  tagTypesFieldName: 'locality.localities.tagTypes',
  tagValuesAggregationFunctionName: 'aggregateLocationTagValues',
  tagValuesFieldName: 'locality.localities.tagValues',
})

const higherGeographySpecifications = createTagSpecification({
  matchFilterFunctionName: 'matchHigherGeographyTags',
  searchFilterFunctionName: 'searchHigherGeographyTags',
  sectionName: 'locality.higherGeography',
  tagTypeAggregationFunctionName: 'aggregateHigherGeographyTagTypes',
  tagTypesFieldName: 'locality.higherGeography.tagTypes',
  tagValuesAggregationFunctionName: 'aggregateHigherGeographyTagValues',
  tagValuesFieldName: 'locality.higherGeography.tagValues',
})

export default [...tagSpecifications, ...higherGeographySpecifications]
