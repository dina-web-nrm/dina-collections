/* eslint-disable no-use-before-define */

function buildAnd({ and = [], filters }) {
  return {
    bool: {
      must: and.map(node => {
        return buildElasticNode({
          filters,
          query: node,
        })
      }),
    },
  }
}

function buildFilter({ filter, filters }) {
  const { filterFunction: filterFunctionName, input } = filter

  const filterFunction =
    filters[filterFunctionName] && filters[filterFunctionName].elasticsearch
  if (!filterFunction) {
    throw new Error(`Filter function not found for ${filterFunctionName}`)
  }

  return filterFunction(input)
}

function buildOr({ or, filters }) {
  return {
    bool: {
      should: or.map(node => {
        return buildElasticNode({
          filters,
          query: node,
        })
      }),
    },
  }
}

function buildElasticNode({ query, filters }) {
  const { and, or, filter } = query
  if (and) {
    return buildAnd({
      and,
      filters,
    })
  }

  if (or) {
    return buildOr({
      filters,
      or,
    })
  }

  if (filter) {
    return buildFilter({
      filter,
      filters,
    })
  }

  return {}
}

module.exports = function buildElasticQuery({ filterSpecification, query }) {
  if (!(query && Object.keys(query).length)) {
    return {
      match_all: {},
    }
  }

  const { filters } = filterSpecification
  return buildElasticNode({
    filters,
    query,
  })
}
