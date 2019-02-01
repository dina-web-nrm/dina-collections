export default function createPreviewSearchSpecification({
  inputFieldName,
  searchFilterFunctionName,
  searchPreviewAggregationFunctionName,
  sectionName,
  srcFieldFieldName,
  srcFieldMatchFilterFunctionName,
  srcFieldsAggregationFunctionName,
}) {
  const searchPreviewAggregation = ({ input = {}, sectionValues }) => {
    const { searchString = '' } = input
    const { srcField } = sectionValues
    if (!searchString) {
      return null
    }
    return {
      aggregationFunction: searchPreviewAggregationFunctionName,
      input: {
        searchString,
        srcFields: srcField === 'any' ? undefined : [srcField],
      },
    }
  }

  const srcFieldsAggregation = () => {
    return {
      aggregationFunction: srcFieldsAggregationFunctionName,
    }
  }

  const searchFilter = ({ input, sectionValues = {} }) => {
    const { searchString } = input
    const { srcField } = sectionValues
    if (!searchString) {
      return null
    }

    return {
      filter: {
        filterFunction: searchFilterFunctionName,
        input: {
          searchString,
          srcFields: srcField === 'any' ? undefined : [srcField],
        },
      },
    }
  }

  const matchSearchFilter = ({ fieldValue, sectionValues = {} }) => {
    const { srcField } = sectionValues
    if (!fieldValue) {
      return null
    }
    return {
      filter: {
        filterFunction: searchFilterFunctionName,
        input: {
          searchString: fieldValue,
          srcFields: srcField === 'any' ? undefined : [srcField],
        },
      },
    }
  }

  const matchSrcFieldFilter = (input = {}) => {
    const { fieldValue } = input

    if (!fieldValue) {
      return null
    }

    return {
      filter: {
        filterFunction: srcFieldMatchFilterFunctionName,
        input: {
          value: fieldValue,
        },
      },
    }
  }

  const rootQueryModifier = ({ rootQuery }) => {
    return {
      ...rootQuery,
      limit: 50,
      sort: ['relevance'],
    }
  }

  return [
    {
      aggregation: searchPreviewAggregation,
      fieldName: inputFieldName,
      matchFilter: searchFilterFunctionName && matchSearchFilter,
      rootQueryModifier,
      searchFilter: searchFilterFunctionName && searchFilter,
      sectionName,
    },
    {
      aggregation: srcFieldsAggregation,
      fieldName: srcFieldFieldName,
      matchFilter: matchSrcFieldFilter,
      sectionName,
    },
  ]
}
