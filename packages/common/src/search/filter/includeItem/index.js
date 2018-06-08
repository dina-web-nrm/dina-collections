const applyFilter = ({ attributesPath, filter, filterFunctions, item }) => {
  const { filterFunction: filterFunctionName, input } = filter

  const filterFunction = filterFunctions[filterFunctionName]
  if (!filterFunction) {
    throw new Error(`Unknown filter function ${filterFunctionName}`)
  }

  return filterFunction({
    attributesPath,
    input,
    item,
  })
}

/* eslint-disable no-use-before-define */
const applyAnd = ({ attributesPath, and, filterFunctions, item }) => {
  return and.every(query => {
    return includeItem({
      attributesPath,
      filterFunctions,
      item,
      query,
    })
  })
}

const applyOr = ({ attributesPath, filterFunctions, item, or }) => {
  return or.some(query => {
    return includeItem({
      attributesPath,
      filterFunctions,
      item,
      query,
    })
  })
}
/* eslint-enable no-use-before-define */

const includeItem = ({ attributesPath, item, query = {}, filterFunctions }) => {
  const { and, or, filter } = query

  if (filter) {
    return applyFilter({
      attributesPath,
      filter,
      filterFunctions,
      item,
      query,
    })
  }

  if (and) {
    return applyAnd({
      and,
      attributesPath,
      filterFunctions,
      item,
    })
  }

  if (or) {
    return applyOr({
      attributesPath,
      filterFunctions,
      item,
      or,
    })
  }
  return true
}

module.exports = includeItem
