export default function createDateRangeSpecification({
  sectionName,
  fieldName,
  rangeFilterFunctionName,
}) {
  const rangeFilter = (input = {}) => {
    const { fieldValue: { startDate, endDate } = {} } = input

    const invalidStart = startDate && !startDate.interpretedTimestamp
    const invalidEnd = endDate && !endDate.interpretedTimestamp

    if (invalidStart || invalidEnd)
      return {
        filter: {
          filterFunction: rangeFilterFunctionName,
          input: {
            value: {
              invalid: true,
            },
          },
        },
      }

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
            endDate,
            start,
            startDate,
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
