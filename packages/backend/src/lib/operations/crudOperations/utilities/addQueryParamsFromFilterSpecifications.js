module.exports = function addQueryParamsFromFilter({
  queryParams,
  filterSpecification = {},
}) {
  const newQueryParams = Object.keys(filterSpecification.filters || {}).reduce(
    (params, filterKey) => {
      const filter = filterSpecification.filters[filterKey]
      const filterQueryParams = {
        description: filter.description,
        required: false,
        schema: filter.inputSchema,
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
