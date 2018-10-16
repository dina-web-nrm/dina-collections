import createCheckboxSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/checkboxSpecification'

export default createCheckboxSpecification({
  aggregationFunctionName: 'aggregateConditionTags',
  fieldName: 'collectingCondition.collectingConditions',
  matchFilterFunctionName: 'matchConditionTags',
  sectionName: 'collectingCondition',
})
