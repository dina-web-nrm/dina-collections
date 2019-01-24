import createFeatureRangeSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/featureRangeSpecification'

const featureRangeSpecification = createFeatureRangeSpecification({
  fieldName: 'weight',
  rangeFilterFunctionName: 'rangeWeight',
  rangeTypeAggregateTagsFunctionName: 'aggregateWeightTags',
  sectionName: 'weight',
})

export default [...featureRangeSpecification]
