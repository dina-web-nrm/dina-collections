const parseFilterValue = require('../../../../utilities/parseFilterValue')

module.exports = function buildWhereFilterFactory() {
  return function buildWhereFilter({
    filterSpecification = {},
    filterInput = {},
  } = {}) {
    return Promise.resolve().then(() => {
      const query = {
        and: [],
      }

      const filterFunctions = {}
      Object.keys(filterInput).forEach(filterKey => {
        const filter =
          filterSpecification.filters && filterSpecification.filters[filterKey]
        if (!filter) {
          throw new Error(`Filter is missing for key: ${filterKey}`)
        }

        const { jsFilterFunction } = filter

        if (!jsFilterFunction) {
          throw new Error(`jsFilterFunction is missing for key: ${filterKey}`)
        }

        filterFunctions[filterKey] = jsFilterFunction
        const filterValue = filterInput[filterKey]

        query.and.push({
          filter: {
            filterFunction: filterKey,
            input: { value: parseFilterValue(filterValue) },
          },
        })
      })

      return {
        filterFunctions,
        query,
      }
    })
  }
}
