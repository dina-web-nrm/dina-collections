import createFeatureRangeSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/featureRangeSpecification'

const featureRangeSpecification = createFeatureRangeSpecification({
  fieldName: 'weight',
  rangeFilterFunctionName: 'rangeWeight',
  rangeTypesAggregateTagsFunctionName: 'aggregateWeightTags',
  rangeTypesMatchFilterFunctionName: 'matchWeightTags',
  sectionName: 'weight',
})

export default [...featureRangeSpecification]
