export default function featureRangeSpecification({
  fieldName,
  rangeFilterFunctionName,
  rangeTypeAggregateTagsFunctionName,
  sectionName,
}) {
  const stringAggregation = () => {
    return {
      aggregationFunction: rangeTypeAggregateTagsFunctionName,
    }
  }

  const rangeFilter = (options = {}) => {
    const { fieldValue: { rangeType, rangeValue, rangeUnit } = {} } = options

    const { max, min } = rangeValue || {}

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
            rangeUnit,
            tagType: rangeType,
          },
        },
      },
    }
  }

  return [
    {
      aggregation: stringAggregation,
      fieldName,
      matchFilter: rangeFilter,
      sectionName,
    },
  ]
}
