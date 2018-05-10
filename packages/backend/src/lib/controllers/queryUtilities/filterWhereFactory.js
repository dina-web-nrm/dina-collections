const Sequelize = require('sequelize')

const { Op } = Sequelize

module.exports = function filterWhereFactory(filterPathMap) {
  return function filterWhereFunction({ request }) {
    const { queryParams: { filter = {} } } = request

    const where = {}
    console.log('filterPathMap', filterPathMap)
    console.log('filter', filter)
    Object.keys(filter).forEach(filterKey => {
      const filterValue = filter[filterKey]
      const path = filterPathMap[filterKey]
      if (path) {
        if (path === 'ids') {
          where[path] = {
            [Op.in]: filterValue,
          }
        } else {
          where[path] = filterValue
        }
      }
    })

    return Promise.resolve(where)
  }
}
