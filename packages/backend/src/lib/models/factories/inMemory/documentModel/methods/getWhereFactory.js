const asyncFilter = require('common/src/search/filter/async')

module.exports = function getWhereFactory({ Model }) {
  // limit, offset,
  return function getWhere({ limit, offset, where } = {}) {
    return Promise.resolve().then(() => {
      const { query, filterFunctions } = where
      const itemArray = Model.getArray()
      return asyncFilter({
        attributesPath: 'document',
        filterFunctions,
        items: itemArray,
        limit,
        offset,
        query,
        returnItems: true,
      }).then(items => {
        return {
          items,
        }
      })
    })
  }
}
