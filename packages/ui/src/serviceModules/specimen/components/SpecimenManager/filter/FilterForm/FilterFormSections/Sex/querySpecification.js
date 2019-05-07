import createCheckboxSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/tagTypesSpecification'

export default createCheckboxSpecification({
  aggregationFunctionName: 'aggregateSexTags',
  fieldName: 'sex.sex',
  matchFilterFunctionName: 'matchSexTags',
  sectionName: 'collectingSex',
})
