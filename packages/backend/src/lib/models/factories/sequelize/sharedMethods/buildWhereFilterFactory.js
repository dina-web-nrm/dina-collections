const asyncReduce = require('common/src/asyncReduce')
const Sequelize = require('sequelize')
const parseFilterValue = require('../../../utilities/parseFilterValue')

const { Op } = Sequelize

module.exports = function buildWhereFilterFactory() {
  return function buildWhereFilter({ filters = [], filterInput = {} } = {}) {
    return asyncReduce({
      initialValue: [],
      items: filters,
      reduceFunction: ({ item: filterSpecification, value: whereArray }) => {
        const { key, sequelizeFilterFunction } = filterSpecification
        if (!sequelizeFilterFunction) {
          return whereArray
        }

        return Promise.resolve()
          .then(() => {
            return sequelizeFilterFunction({
              filterInput,
              Op,
              value: parseFilterValue(filterInput[key]),
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
