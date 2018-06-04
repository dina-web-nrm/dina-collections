const applyFilter = ({ filter, filterFunctions, item }) => {
  const { filterFunction: filterFunctionName, input } = filter

  const filterFunction = filterFunctions[filterFunctionName]
  if (!filterFunction) {
    throw new Error(`Unknown filter function ${filterFunctionName}`)
  }

  return filterFunction({
    input,
    item,
  })
}

/* eslint-disable no-use-before-define */
const applyAnd = ({ and, filterFunctions, item }) => {
  return and.every(query => {
    return includeItem({
      filterFunctions,
      item,
      query,
    })
  })
}

const applyOr = ({ filterFunctions, item, or }) => {
  return or.some(query => {
    return includeItem({
      filterFunctions,
      item,
      query,
    })
  })
}
/* eslint-enable no-use-before-define */

const includeItem = ({ item, query, filterFunctions }) => {
  const { and, or, filter } = query

  if (filter) {
    return applyFilter({
      filter,
      filterFunctions,
      item,
      query,
    })
  }

  if (and) {
    return applyAnd({
      and,
      filterFunctions,
      item,
    })
  }

  if (or) {
    return applyOr({
      filterFunctions,
      item,
      or,
    })
  }
  return true
}

module.exports = includeItem
