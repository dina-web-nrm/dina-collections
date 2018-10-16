import createCheckboxSpecification from './checkboxSpecification'

export default function featureRangeSpecification({
  rangeFilterFunctionName,
  sectionName,
  fieldName,

  rangeTypesAggregateTagsFunctionName,
  rangeTypesMatchFilterFunctionName,
}) {
  const valueFieldName = `${fieldName}.rangeValue`
  const rangeTypesFieldName = `${fieldName}.rangeTypes`

  const specifications = []

  const rangeFilter = (options = {}) => {
    const {
      fieldValue: { min, max } = {},
      sectionValues: { rangeTypes, rangeUnit } = {},
    } = options

    if (min === undefined && max === undefined) {
      return null
    }
    return {
      filter: {
        filterFunction: rangeFilterFunctionName,
        input: {
          value: {
            max,
            min,
            rangeTypes,
            rangeUnit,
          },
        },
      },
    }
  }

  specifications.push({
    fieldName: valueFieldName,
    matchFilter: rangeFilter,
    sectionName,
  })

  if (rangeTypesFieldName) {
    const checkboxSpecification = createCheckboxSpecification({
      aggregationFunctionName: rangeTypesAggregateTagsFunctionName,
      fieldName: rangeTypesFieldName,
      matchFilterFunctionName: rangeTypesMatchFilterFunctionName,
      sectionName,
    })

    specifications.push(checkboxSpecification[0])
  }

  return specifications
}
