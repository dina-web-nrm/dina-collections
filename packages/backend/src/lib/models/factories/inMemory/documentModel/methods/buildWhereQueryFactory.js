module.exports = function buildQueryFilterFactory() {
  return function buildQueryFilter({
    filterSpecification = {},
    query = {},
  } = {}) {
    const filterSpecificationArray = Object.keys(
      filterSpecification.filters || {}
    ).map(key => {
      return filterSpecification.filters[key]
    })

    return Promise.resolve().then(() => {
      const filterFunctions = filterSpecificationArray.reduce(
        (obj, { key, jsFilterFunction }) => {
          return {
            ...obj,
            [key]: jsFilterFunction,
          }
        },
        {}
      )

      return {
        filterFunctions,
        query,
      }
    })
  }
}
