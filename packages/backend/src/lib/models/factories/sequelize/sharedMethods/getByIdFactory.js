const extractFieldsFromItem = require('../../../../data/fields/utilities/extractFieldsFromItem')
const extractFieldsFromUserInput = require('../../../../data/fields/utilities/extractFieldsFromUserInput')

const getByIdWrapper = require('../../wrappers/methods/getById')
const formatModelItemResponse = require('../utilities/formatModelItemResponse')

module.exports = function getByIdFactory({ Model }) {
  if (!Model) {
    throw new Error('Have to provide model')
  }
  return getByIdWrapper(
    ({
      allowDeactivated = false,
      excludeFieldsInput = [],
      id,
      include = [],
      includeFieldsInput = [],
      raw = true,
      selectableFields = [],
    }) => {
      return Model.findOne({
        include,
        where: allowDeactivated
          ? { id }
          : {
              deactivatedAt: null,
              id,
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

        if (fields.length || excludeFieldsInput.length) {
          return {
            item: extractFieldsFromItem({
              excludeFieldsInput,
              fields,
              item,
            }),
          }
        }

        return {
          item,
        }
      })
    }
  )
}
