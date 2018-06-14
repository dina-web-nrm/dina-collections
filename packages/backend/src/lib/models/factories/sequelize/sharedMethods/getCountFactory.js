const Sequelize = require('sequelize')

module.exports = function getCountFactory({ Model }) {
  return function getCount({ where = {} } = {}) {
    const options = {
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
      where: where.deactivatedAt
        ? where
        : {
            ...where,
            deactivatedAt: null,
          },
    }

    return Model.findAll(options).then(res => {
      return res[0].dataValues.count
    })
  }
}
