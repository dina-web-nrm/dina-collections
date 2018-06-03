const Sequelize = require('sequelize')

const { Op } = Sequelize

module.exports = function filterWhereFactory(filterPathMap) {
  return function filterWhereFunction({ request }) {
    const { queryParams: { filter = {} } } = request

    const where = {}
    Object.keys(filter).forEach(filterKey => {
      const filterValue = filter[filterKey]
      const path = filterPathMap[filterKey]
      if (path) {
        if (path === 'ids') {
          where[path] = {
            [Op.in]: filterValue,
          }
        } else if (path === 'updatedAt') {
          where[path] = {
            [Op.gt]: filterValue,
          }
        } else {
          where[path] = filterValue
        }
      }
    })

    return Promise.resolve(where)
  }
}
