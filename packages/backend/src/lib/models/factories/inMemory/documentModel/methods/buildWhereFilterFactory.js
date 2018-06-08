module.exports = function buildWhereFilterFactory() {
  return function buildWhereFilter({ filters = [], filterInput = {} } = {}) {
    return Promise.resolve().then(() => {
      const query = {
        and: [],
      }

      const filterFunctions = {}

      filters.forEach(({ key, jsFilterFunction }) => {
        const filterValue = filterInput[key]
        if (filterValue !== undefined && jsFilterFunction) {
          query.and.push({
            filter: {
              filterFunction: key,
              input: { value: filterValue },
            },
          })
          filterFunctions[key] = jsFilterFunction
        }
      })

      return {
        filterFunctions,
        query,
      }
    })
  }
}
