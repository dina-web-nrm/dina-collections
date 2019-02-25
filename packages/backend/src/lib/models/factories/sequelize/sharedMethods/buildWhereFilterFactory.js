const asyncReduce = require('common/src/asyncReduce')
const Sequelize = require('sequelize')
const parseFilterValue = require('../../../utilities/parseFilterValue')

const { Op } = Sequelize

module.exports = function buildWhereFilterFactory({ sequelize }) {
  return function buildWhereFilter({
    filterSpecification = {},
    filterInput = {},
    where: customWhere,
    serviceInteractor,
  } = {}) {
    if (customWhere) {
      return Promise.resolve(customWhere)
    }
    const filterSpecificationArray = Object.keys(
      filterSpecification.filters || {}
    ).map(key => {
      return filterSpecification.filters[key]
    })

    Object.keys(filterInput).forEach(key => {
      const filter =
        filterSpecification &&
        filterSpecification.filters &&
        filterSpecification.filters[key]
      if (!filter) {
        throw new Error(`filter is missing for key: ${key}`)
      }
      if (!filter.sequelizeFilterFunction) {
        throw new Error(`sequelizeFilterFunction is missing for key: ${key}`)
      }
    })

    return asyncReduce({
      initialValue: [],
      items: filterSpecificationArray,
      reduceFunction: ({ item: filter, value: whereArray }) => {
        const { key, sequelizeFilterFunction } = filter
        if (!sequelizeFilterFunction) {
          return whereArray
        }

        return Promise.resolve()
          .then(() => {
            return sequelizeFilterFunction({
              filterInput,
              Op,
              sequelize,
              serviceInteractor,
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
