import { ANY } from '../../../../constants'

export default function createStringSpecification({
  aggregationFunctionName,
  fieldName,
  matchFilterFunctionName,
  sectionName,
}) {
  const stringAggregation = () => {
    return {
      aggregationFunction: aggregationFunctionName,
    }
  }

  const stringMatchFilter = ({ fieldValue }) => {
    if (!fieldValue || fieldValue === ANY) {
      return null
    }

    return {
      filter: {
        filterFunction: matchFilterFunctionName,
        input: {
          value: fieldValue,
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
