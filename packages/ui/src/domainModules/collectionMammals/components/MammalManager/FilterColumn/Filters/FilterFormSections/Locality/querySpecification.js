import createTagSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/tagSpecification'
import createIdSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/idSpecification'

const tagSpecifications = createTagSpecification({
  matchFilterFunctionName: 'matchLocationTags',
  searchFilterFunctionName: 'searchLocationTags',
  sectionName: 'locality',
  tagTypeAggregationFunctionName: 'aggregateLocationTagTypes',
  tagTypesFieldName: 'locality.tagTypes',
  tagValuesAggregationFunctionName: 'aggregateLocationTagValues',
  tagValuesFieldName: 'locality.tagValues',
})

const placeIdSpecification = createIdSpecification({
  fieldName: 'locality.higherGeography',
  idMatchFilterFunctionName: 'matchPlaceIdTags',
  sectionName: 'locality',
})

export default [...tagSpecifications, ...placeIdSpecification]
