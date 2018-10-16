import createCheckboxSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/checkboxSpecification'
import createDateRangeSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/dateRangeSpecification'

const rangeSpecification = createDateRangeSpecification({
  fieldName: 'datePeriod.date',
  rangeFilterFunctionName: 'searchDates',
  sectionName: 'datePeriod',
})

const checkboxSpecification = createCheckboxSpecification({
  aggregationFunctionName: 'aggregateDateTags',
  fieldName: 'datePeriod.types',
  matchFilterFunctionName: 'matchDateTags',
  sectionName: 'datePeriod',
})

export default [...rangeSpecification, ...checkboxSpecification]
