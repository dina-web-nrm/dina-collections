const getOneWhereWrapper = require('../../wrappers/methods/getOneWhere')
const formatModelItemResponse = require('../utilities/formatModelItemResponse')

module.exports = function getOneWhereFactory({ buildWhereFilter, Model }) {
  return getOneWhereWrapper(
    ({ include = undefined, raw = true, filterInput, filterSpecification }) => {
      return buildWhereFilter({
        filterInput,
        filterSpecification,
      }).then(where => {
        return Model.findOne({
          include,
          order: [['id', 'DESC']],
          where: where.deactivatedAt
            ? where
            : {
                ...where,
                deactivatedAt: null,
              },
        }).then(res => {
          if (!raw) {
            return { item: res }
          }
          return formatModelItemResponse({ input: res })
        })
      })
    }
  )
}
