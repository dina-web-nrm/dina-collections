module.exports = function filterWhereFactory(filterPathMap) {
  return function filterWhereFunction({ request }) {
    const { queryParams: { filter = {} } } = request

    const where = {}
    Object.keys(filter).forEach(filterKey => {
      const filterValue = filter[filterKey]
      const path = filterPathMap[filterKey]
      if (path) {
        where[path] = filterValue
      }
    })

    return Promise.resolve(where)
  }
}
