module.exports = function buildQueryFilterFactory() {
  return function buildQueryFilter(
    { filterSpecificationMap = [], query = {} } = {}
  ) {
    const filterSpecificationArray = Object.keys(filterSpecificationMap).map(
      key => {
        return filterSpecificationMap[key]
      }
    )

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
