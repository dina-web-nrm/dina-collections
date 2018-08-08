const extractFieldsFromItem = require('../../../../data/fields/utilities/extractFieldsFromItem')
const extractFieldsFromUserInput = require('../../../../data/fields/utilities/extractFieldsFromUserInput')
const getOneWhereWrapper = require('../../wrappers/methods/getOneWhere')
const formatModelItemResponse = require('../utilities/formatModelItemResponse')

module.exports = function getOneWhereFactory({ buildWhereFilter, Model }) {
  return getOneWhereWrapper(
    ({
      fieldsInput = [],
      fieldsSpecification = {},
      include = undefined,
      raw = true,
      filterInput,
      filterSpecification,
    }) => {
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

          const { item } = formatModelItemResponse({ input: res })
          const fields = extractFieldsFromUserInput({
            fieldsInput,
            fieldsSpecification,
          })

          if (fields.length) {
            return {
              item: extractFieldsFromItem({
                fields,
                item,
              }),
            }
          }

          return {
            item,
          }
        })
      })
    }
  )
}
