module.exports = function addQueryParamsFromFilter({
  filterSpecification = {},
  ignore = [],
  queryParams,
}) {
  const newQueryParams = Object.keys(filterSpecification.filters || {}).reduce(
    (params, filterKey) => {
      const filter = filterSpecification.filters[filterKey]
      const filterQueryParams = {
        description: filter.description,
        required: false,
        schema: filter.inputSchema,
      }
      if (!filterQueryParams || ignore.includes(filterKey)) {
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
