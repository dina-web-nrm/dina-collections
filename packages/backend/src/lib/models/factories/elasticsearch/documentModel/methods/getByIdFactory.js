const extractFieldsFromItem = require('../../../../../data/fields/utilities/extractFieldsFromItem')
const extractFieldsFromUserInput = require('../../../../../data/fields/utilities/extractFieldsFromUserInput')
const getByIdWrapper = require('../../../wrappers/methods/getById')

module.exports = function getByIdFactory({ Model, elasticsearch }) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  return getByIdWrapper(
    ({ includeFieldsInput = [], selectableFields = [], id }) => {
      return elasticsearch
        .get({
          id,
          index: Model.index,
          type: Model.name,
        })
        .then(res => {
          const item = res && res._source // eslint-disable-line no-underscore-dangle

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
        .catch(err => {
          if (err && err.status === 404) {
            return { item: null }
          }

          throw err
        })
    }
  )
}
