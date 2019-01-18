export default function createTagTypesSpecification({
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

    return {
      filter: {
        filterFunction: matchFilterFunctionName,
        input: {
          tagTypes: fieldValue,
        },
      },
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
