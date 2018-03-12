const { Op } = require('sequelize')
const createArrayResponse = require('../../../lib/controllers/transformations/createArrayResponse')
const transformOutput = require('../../../lib/controllers/transformations/outputArray')

module.exports = function curatedLocalityGetWhere({ operation, models }) {
  const { resource } = operation
  return ({ request }) => {
    const { queryParams: { filter: { search, group } = {} } } = request
    const model = models[resource]

    const where = {}

    if (group !== undefined) {
      where['document.group'] = group
    }

    if (search !== undefined) {
      where['document.name'] = {
        [Op.like]: `%${search.toLowerCase()}%`,
      }
    }

    return model
      .getWhere({ where })
      .then(transformOutput)
      .then(items => {
        return createArrayResponse({
          items,
          type: resource,
        })
      })
  }
}
