const { Op } = require('sequelize')

module.exports = function buildWhereFactory({ request }) {
  const { queryParams: { filter: { group, parentId, search } = {} } } = request

  const where = {}

  if (group !== undefined) {
    where['document.group'] = group
  }

  if (search !== undefined) {
    where['document.name'] = {
      [Op.like]: `%${search.toLowerCase()}%`,
    }
  }

  if (parentId !== undefined) {
    where.id = parentId
  }

  return Promise.resolve(where)
}
