export default function createPreviewSearchSpecification({
  inputFieldName,
  srcFieldMatchFilterFunctionName,
  searchFilterFunctionName,
  searchPreviewAggregationFunctionName,
  sectionName,
  srcFieldsAggregationFunctionName,
  srcFieldsFieldName,
}) {
  const searchPreviewAggregation = ({ input = {}, sectionValues }) => {
    const { searchString = '' } = input
    const { srcFields } = sectionValues
    if (!searchString) {
      return null
    }
    return {
      aggregationFunction: searchPreviewAggregationFunctionName,
      input: {
        searchString,
        srcFields,
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
    const { srcFields } = sectionValues
    if (!searchString) {
      return null
    }

    return {
      filter: {
        filterFunction: searchFilterFunctionName,
        input: {
          searchString,
          srcFields,
        },
      },
    }
  }

  const matchSearchFilter = ({ fieldValue, sectionValues = {} }) => {
    const { srcFields } = sectionValues
    if (!fieldValue) {
      return null
    }
    return {
      filter: {
        filterFunction: searchFilterFunctionName,
        input: {
          searchString: fieldValue,
          srcFields,
        },
      },
    }
  }

  const matchSrcFieldsFilter = (input = {}) => {
    const { fieldValue } = input

    if (!(fieldValue && fieldValue.length)) {
      return null
    }

    const tagFilters = []

    fieldValue.forEach(srcField => {
      tagFilters.push({
        filter: {
          filterFunction: srcFieldMatchFilterFunctionName,
          input: {
            value: srcField,
          },
        },
      })
    })

    return {
      or: tagFilters,
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
      fieldName: srcFieldsFieldName,
      matchFilter: matchSrcFieldsFilter,
      sectionName,
    },
  ]
}
