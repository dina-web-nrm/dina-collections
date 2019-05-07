import createCheckboxSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/tagTypesSpecification'
import createNumberRangeSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/numberRangeSpecification'

const rangeSpecification = createNumberRangeSpecification({
  fieldName: 'ageAndStage.age',
  rangeFilterFunctionName: 'rangeAge',
  sectionName: 'ageAndStage',
})

const checkboxSpecification = createCheckboxSpecification({
  aggregationFunctionName: 'aggregateAgeStageTags',
  fieldName: 'ageAndStage.stages',
  matchFilterFunctionName: 'matchAgeStageTags',
  sectionName: 'ageAndStage',
})

export default [...rangeSpecification, ...checkboxSpecification]
