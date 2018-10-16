import createCheckboxSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/checkboxSpecification'

export default createCheckboxSpecification({
  aggregationFunctionName: 'aggregateSexTags',
  fieldName: 'sex.sex',
  matchFilterFunctionName: 'matchSexTags',
  sectionName: 'collectingSex',
})
