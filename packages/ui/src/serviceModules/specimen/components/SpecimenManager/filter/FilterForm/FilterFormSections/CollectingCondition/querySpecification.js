import createCheckboxSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/tagTypesSpecification'

export default createCheckboxSpecification({
  aggregationFunctionName: 'aggregateConditionTags',
  fieldName: 'collectingCondition.collectingConditions',
  matchFilterFunctionName: 'matchConditionTags',
  sectionName: 'collectingCondition',
})
