const asyncReduce = require('common/src/asyncReduce')
const Sequelize = require('sequelize')

const { Op } = Sequelize

module.exports = function buildWhereQueryFactory({ sequelize }) {
  return function buildWhereQuery(
    { filterSpecification, query = {}, serviceInteractor } = {}
  ) {
    if (query.or) {
      throw new Error('Or not supported')
    }

    if (Object.keys(query) === 0 || !query.and) {
      return Promise.resolve({})
    }

    return asyncReduce({
      initialValue: [],
      items: query.and,
      reduceFunction: ({ item: filterInput, value: whereArray }) => {
        if (!filterInput.filter) {
          throw new Error('Missing filter')
        }
        const { filterFunction: filterFunctionName, input } = filterInput.filter

        const filter = filterSpecification.filters[filterFunctionName]
        if (!filter) {
          throw new Error(
            `filter is missing for filterFunction: ${filterFunctionName}`
          )
        }

        const { sequelizeFilterFunction } = filter

        if (!sequelizeFilterFunction) {
          throw new Error(
            `sequelizeFilterFunction missing for filterFunction: ${
              filterFunctionName
            }`
          )
        }

        return Promise.resolve()
          .then(() => {
            return sequelizeFilterFunction({
              Op,
              sequelize,
              serviceInteractor,
              value: input.value,
            })
          })
          .then(filterFunctionWhere => {
            if (filterFunctionWhere) {
              whereArray.push(filterFunctionWhere)
            }
            return whereArray
          })
      },
    }).then(whereArray => {
      if (whereArray.length === 0) {
        return {}
      } else if (whereArray.length === 1) {
        return whereArray[0]
      }
      return {
        [Op.and]: whereArray,
      }
    })
  }
}
