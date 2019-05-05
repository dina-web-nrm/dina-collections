import createFeatureRangeSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/featureRangeSpecification'

const featureRangeSpecification = createFeatureRangeSpecification({
  fieldName: 'length',
  rangeFilterFunctionName: 'rangeLength',
  rangeTypeAggregateTagsFunctionName: 'aggregateLengthTags',
  sectionName: 'length',
})

export default [...featureRangeSpecification]
