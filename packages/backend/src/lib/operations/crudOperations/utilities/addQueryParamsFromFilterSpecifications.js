module.exports = function addQueryParamsFromFilter({
  queryParams,
  filterSpecifications = [],
}) {
  const newQueryParams = Object.keys(filterSpecifications).reduce(
    (params, filterKey) => {
      const filter = filterSpecifications[filterKey]
      const filterQueryParams = filter.queryParams || {}
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
