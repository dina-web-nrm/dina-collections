module.exports = function getOneWhereFactory({ Model }) {
  return function getOneWhere({ where } = {}) {
    if (!where) {
      return Promise.reject(new Error('where not provided'))
    }

    return Model.findOne({
      order: [['versionId', 'DESC']],
      raw: true,
      where,
    })
  }
}
