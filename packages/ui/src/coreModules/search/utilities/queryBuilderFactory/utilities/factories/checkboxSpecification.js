export default function createCheckboxSpecification({
  sectionName,
  fieldName,
  matchFilterFunctionName,
  aggregationFunctionName,
}) {
  const stringAggregation = () => {
    return {
      aggregationFunction: aggregationFunctionName,
    }
  }

  const stringMatchFilter = ({ fieldValue }) => {
    if (!(fieldValue && fieldValue.length)) {
      return null
    }
    const stringFilters = fieldValue.map(value => {
      return {
        filter: {
          filterFunction: matchFilterFunctionName,
          input: {
            value,
          },
        },
      }
    })

    return {
      or: stringFilters,
    }
  }

  return [
    {
      aggregation: stringAggregation,
      fieldName,
      matchFilter: stringMatchFilter,
      sectionName,
    },
  ]
}
