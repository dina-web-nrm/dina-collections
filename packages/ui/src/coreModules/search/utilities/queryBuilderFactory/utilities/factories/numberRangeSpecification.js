export default function createNumberRangeSpecification({
  sectionName,
  fieldName,
  rangeFilterFunctionName,
}) {
  const rangeFilter = (input = {}) => {
    const { fieldValue: { min, max } = {} } = input

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
          },
        },
      },
    }
  }

  return [
    {
      fieldName,
      matchFilter: rangeFilter,
      sectionName,
    },
  ]
}
