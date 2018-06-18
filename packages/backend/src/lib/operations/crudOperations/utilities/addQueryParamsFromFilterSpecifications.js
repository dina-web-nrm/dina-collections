module.exports = function addQueryParamsFromFilter({
  queryParams,
  filterSpecificationMap = [],
}) {
  const newQueryParams = Object.keys(filterSpecificationMap).reduce(
    (params, filterKey) => {
      const filter = filterSpecificationMap[filterKey]
      const filterQueryParams = {
        description: filter.description,
        required: false,
        schema: filter.valueSchema,
      }
      if (!filterQueryParams) {
        return params
      }

      return {
        ...params,
        [`filter[${filterKey}]`]: filterQueryParams,
      }
    },
    {}
  )

  return {
    ...queryParams,
    ...newQueryParams,
  }
}
