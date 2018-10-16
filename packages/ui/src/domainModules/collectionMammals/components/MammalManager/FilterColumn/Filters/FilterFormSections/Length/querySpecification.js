import createFeatureRangeSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/featureRangeSpecification'

const featureRangeSpecification = createFeatureRangeSpecification({
  fieldName: 'length',
  rangeFilterFunctionName: 'rangeLength',
  rangeTypesAggregateTagsFunctionName: 'aggregateLengthTags',
  rangeTypesMatchFilterFunctionName: 'matchLengthTags',
  sectionName: 'length',
})

export default [...featureRangeSpecification]
