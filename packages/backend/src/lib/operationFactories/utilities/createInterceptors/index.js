module.exports = function createInterceptors({
  customInterceptors = [],
  filterSpecification = {},
}) {
  const { filters = {} } = filterSpecification
  const filterKeys = Object.keys(filters)
  if (!filterKeys.length) {
    return customInterceptors
  }

  return filterKeys.reduce((array, filterKey) => {
    const filter = filters[filterKey]
    if (filter.interceptor) {
      return [filter.interceptor, ...array]
    }
    return array
  }, customInterceptors)
}
