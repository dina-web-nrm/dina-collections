export default function createDateRangeSpecification({
  sectionName,
  fieldName,
  rangeFilterFunctionName,
}) {
  const rangeFilter = (input = {}) => {
    const { fieldValue: { startDate, endDate } = {} } = input

    const start = startDate && startDate.interpretedTimestamp
    const end = endDate && endDate.interpretedTimestamp

    if (start === undefined && end === undefined) {
      return null
    }

    return {
      filter: {
        filterFunction: rangeFilterFunctionName,
        input: {
          value: {
            end,
            start,
            // dateType,
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
