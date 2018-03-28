const { Op } = require('sequelize')

module.exports = function buildWhereFactory({ request }) {
  const { queryParams: { filter: { name } = {} } } = request

  let where = {}

  if (name !== undefined) {
    where = {
      [Op.or]: [
        {
          'document.scientificName': {
            [Op.iLike]: `%${name.toLowerCase()}%`,
          },
        },
        {
          'document.vernacularNames.en': {
            [Op.iLike]: `%${name.toLowerCase()}%`,
          },
        },
        {
          'document.vernacularNames.sv': {
            [Op.iLike]: `%${name.toLowerCase()}%`,
          },
        },
      ],
    }
  }
  return Promise.resolve(where)
}
