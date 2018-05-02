const { Op } = require('sequelize')

module.exports = function buildWhereFactory({ request }) {
  const { queryParams: { filter: { name } = {} } } = request

  let where = {}

  if (name !== undefined) {
    where = {
      'document.name': {
        [Op.iLike]: `%${name.toLowerCase()}%`,
      },
    }
  }

  return Promise.resolve(where)
}
