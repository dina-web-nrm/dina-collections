export default function createTagSpecification({
  sectionName,
  includeTagTypesInAggregation = true,
  matchFilterFunctionName,
  searchFilterFunctionName,
  tagTypeAggregationFunctionName,
  tagTypesFieldName,
  tagValuesAggregationFunctionName,
  tagValuesFieldName,
}) {
  const tagValuesAggregation = ({ input = {}, sectionValues }) => {
    const selectedTagTypes = sectionValues && sectionValues.tagTypes

    const { tagType: tagInputType, tagValue, limit = 10 } = input

    const tagTypes = tagInputType ? [tagInputType] : selectedTagTypes

    return {
      aggregationFunction: tagValuesAggregationFunctionName,
      input: {
        limit,
        tagTypes: includeTagTypesInAggregation ? tagTypes : undefined,
        tagValue,
      },
    }
  }

  const tagTypesAggregation = () => {
    return {
      aggregationFunction: tagTypeAggregationFunctionName,
    }
  }

  const searchFilter = ({ input }) => {
    const { tagType, tagValue } = input
    return {
      filter: {
        filterFunction: searchFilterFunctionName,
        input: {
          tagType,
          tagValue,
        },
      },
    }
  }

  const matchTagValuesFilter = ({ fieldValue }) => {
    if (!fieldValue) {
      return null
    }

    const tagFilters = []
    Object.keys(fieldValue).forEach(key => {
      fieldValue[key].matchingTags
        .filter(tag => {
          return !!tag.selected
        })
        .forEach(tag => {
          tagFilters.push({
            filter: {
              filterFunction: matchFilterFunctionName,
              input: {
                tagType: tag.attributes.tagType,
                tagValue: tag.attributes.tagValue,
              },
            },
          })
        })
    })
    if (!tagFilters.length) {
      return null
    }

    return {
      or: tagFilters,
    }
  }

  const matchTagTypesFilter = (input = {}) => {
    const { fieldValue } = input

    if (!(fieldValue && fieldValue.length)) {
      return null
    }

    const tagFilters = []

    fieldValue.forEach(tagType => {
      tagFilters.push({
        filter: {
          filterFunction: matchFilterFunctionName,
          input: {
            tagType,
          },
        },
      })
    })

    return {
      or: tagFilters,
    }
  }

  return [
    {
      aggregation: tagValuesAggregation,
      fieldName: tagValuesFieldName,
      matchFilter: matchTagValuesFilter,
      searchFilter: searchFilterFunctionName && searchFilter,
      sectionName,
    },
    {
      aggregation: tagTypesAggregation,
      fieldName: tagTypesFieldName,
      matchFilter: matchTagTypesFilter,
      sectionName,
    },
  ]
}
