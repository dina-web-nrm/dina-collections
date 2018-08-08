const extractFieldsFromItem = require('../../../../data/fields/utilities/extractFieldsFromItem')
const extractFieldsFromUserInput = require('../../../../data/fields/utilities/extractFieldsFromUserInput')
const getOneWhereWrapper = require('../../wrappers/methods/getOneWhere')
const formatModelItemResponse = require('../utilities/formatModelItemResponse')

module.exports = function getOneWhereFactory({ buildWhereFilter, Model }) {
  return getOneWhereWrapper(
    ({
      filterInput,
      filterSpecification,
      include = undefined,
      includeFieldsInput = [],
      raw = true,
      selectableFields = [],
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
            includeFieldsInput,
            selectableFields,
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
