import createMultipleSearchTagsSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/multipleSearchTagsSpecification'
import createCheckboxSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/tagTypesSpecification'

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

const appearanceCheckboxSpecification = createCheckboxSpecification({
  aggregationFunctionName: 'aggregateAppearanceTags',
  fieldName: 'collectingInformation.establishmentMeansType',
  matchFilterFunctionName: 'matchAppearanceTags',
  sectionName: 'locality.appearance',
})

const selectiveBreedingCheckboxSpecification = createCheckboxSpecification({
  aggregationFunctionName: 'aggregateSelectiveBreedingTags',
  fieldName: 'originInformation.isResultOfSelectiveBreeding',
  matchFilterFunctionName: 'matchSelectiveBreedingTags',
  sectionName: 'locality.selectiveBreeding',
})

export default [
  ...appearanceCheckboxSpecification,
  ...higherGeographySpecifications,
  ...multipleSearchTagsSpecifications,
  ...selectiveBreedingCheckboxSpecification,
]
