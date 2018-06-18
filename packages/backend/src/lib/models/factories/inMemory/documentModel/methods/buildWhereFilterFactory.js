const parseFilterValue = require('../../../../utilities/parseFilterValue')

module.exports = function buildWhereFilterFactory() {
  return function buildWhereFilter(
    { filterSpecificationMap = {}, filterInput = {} } = {}
  ) {
    const filterSpecificationArray = Object.keys(filterSpecificationMap).map(
      key => {
        return filterSpecificationMap[key]
      }
    )

    return Promise.resolve().then(() => {
      const query = {
        and: [],
      }

      const filterFunctions = {}

      filterSpecificationArray.forEach(({ key, jsFilterFunction }) => {
        const filterValue = filterInput[key]
        if (filterValue !== undefined && jsFilterFunction) {
          query.and.push({
            filter: {
              filterFunction: key,
              input: { value: parseFilterValue(filterValue) },
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
