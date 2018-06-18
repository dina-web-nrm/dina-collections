module.exports = function buildQueryFilterFactory() {
  return function buildQueryFilter(
    { filterSpecifications = [], query = {} } = {}
  ) {
    const filterSpecificationArray = Object.keys(filterSpecifications).map(
      key => {
        return filterSpecifications[key]
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
