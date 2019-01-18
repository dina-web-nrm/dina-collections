import createCheckboxSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/tagTypesSpecification'

export default createCheckboxSpecification({
  aggregationFunctionName: 'aggregateBoneTags',
  fieldName: 'bones.bones',
  matchFilterFunctionName: 'matchBoneTags',
  sectionName: 'bones',
})
