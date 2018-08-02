// const buildElasticAggregations = require('../../utilities/buildElasticAggregations')
const buildElasticQuery = require('../../utilities/buildElasticQuery')

const buildQueryFromFilters = ({ filterInput }) => {
  if (!filterInput) {
    return null
  }
  const and = Object.keys(filterInput).map(key => {
    return {
      filter: {
        filterFunction: key,
        input: { value: filterInput[key] },
      },
    }
  })

  return {
    and,
  }
}

module.exports = function buildWhereFilterFactory() {
  return function buildQueryFilter({ filterInput, filterSpecification } = {}) {
    return Promise.resolve().then(() => {
      const query = buildQueryFromFilters({
        filterInput,
      })

      const elasticQuery = buildElasticQuery({
        filterSpecification,
        query,
      })

      return {
        query: elasticQuery,
      }
    })
  }
}
