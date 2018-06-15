module.exports = function buildQueryFilterFactory() {
  return function buildQueryFilter({ filters = [], query = {} } = {}) {
    return Promise.resolve().then(() => {
      const filterFunctions = filters.reduce(
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
