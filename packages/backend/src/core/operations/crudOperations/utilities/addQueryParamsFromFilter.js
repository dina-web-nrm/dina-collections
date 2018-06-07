module.exports = function addQueryParamsFromFilter({
  queryParams,
  filters = [],
}) {
  const newQueryParams = filters.reduce((params, filter) => {
    const filterQueryParams = filter.queryParams || {}
    if (!filterQueryParams) {
      return params
    }

    return {
      ...params,
      [`filter[${filter.key}]`]: filterQueryParams,
    }
  }, {})

  return {
    ...queryParams,
    ...newQueryParams,
  }
}
