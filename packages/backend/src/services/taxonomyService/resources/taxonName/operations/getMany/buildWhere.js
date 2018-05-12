const { Op } = require('sequelize')

module.exports = function buildWhereFactory({ request }) {
  const { queryParams: { filter: { name, ids } = {} } } = request

  let where = {}

  if (ids !== undefined) {
    where.id = {
      [Op.in]: ids,
    }
  }

  if (name !== undefined) {
    where = {
      'document.name': {
        [Op.iLike]: `%${name.toLowerCase()}%`,
      },
    }
  }

  return Promise.resolve(where)
}
