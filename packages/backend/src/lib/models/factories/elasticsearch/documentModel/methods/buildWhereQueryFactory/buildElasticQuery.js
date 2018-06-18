/* eslint-disable no-use-before-define */

function buildAnd({ and = [], filterFunctions }) {
  return {
    bool: {
      must: and.map(node => {
        return buildElasticQuery({
          filterFunctions,
          filters: node,
        })
      }),
    },
  }
}

function buildFilter({ filter, filterFunctions }) {
  const { filterFunction: filterFunctionName, value } = filter

  const filterFunction = filterFunctions[filterFunctionName]
  if (!filterFunction) {
    throw new Error(`Filter function not found for ${filterFunctionName}`)
  }

  return filterFunction({
    value,
  })
}

function buildOr({ or, filterFunctions }) {
  return {
    bool: {
      should: or.map(node => {
        return buildElasticQuery({
          filterFunctions,
          filters: node,
        })
      }),
    },
  }
}

function buildElasticQuery({ filters, filterFunctions }) {
  const { and, or, filter } = filters
  if (and) {
    return buildAnd({
      and,
      filterFunctions,
    })
  }

  if (or) {
    return buildOr({
      filterFunctions,
      or,
    })
  }

  if (filter) {
    return buildFilter({
      filter,
      filterFunctions,
    })
  }

  return {}
  // throw new Error('Missing any key of [and, or, filter]')
}

module.exports = buildElasticQuery
