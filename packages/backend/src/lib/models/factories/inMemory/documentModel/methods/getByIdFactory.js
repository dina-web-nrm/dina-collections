const extractFieldsFromItem = require('../../../../../data/fields/utilities/extractFieldsFromItem')
const extractFieldsFromUserInput = require('../../../../../data/fields/utilities/extractFieldsFromUserInput')
const getByIdWrapper = require('../../../wrappers/methods/getById')

module.exports = function getByIdFactory({ Model }) {
  return getByIdWrapper(({ includeFieldsInput, selectableFields, id }) => {
    const currentItems = Model.get()
    const item = currentItems[id] || null
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

    return { item }
  })
}
