module.exports = function addQueryParamsFromFilter({
  queryParams,
  filterSpecifications = [],
}) {
  const newQueryParams = Object.keys(filterSpecifications).reduce(
    (params, filterKey) => {
      const filter = filterSpecifications[filterKey]
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
