const Sequelize = require('sequelize')

module.exports = function getCountFactory({ Model }) {
  return function getWhere({ forceCurrentVersion = true } = {}) {
    const where = forceCurrentVersion
      ? {
          isCurrentVersion: true,
        }
      : {}

    const options = {
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
      where,
    }

    return Model.findAll(options).then(res => {
      return res[0].dataValues.count
    })
  }
}
