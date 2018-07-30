const bulkCreateWrapper = require('../../../wrappers/methods/bulkCreate')
const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/models/factories/inMemory/documentModel/methods/bulkCreateFactory'
)

module.exports = function bulkCreateFactory({ Model }) {
  return bulkCreateWrapper(({ items }) => {
    return Promise.resolve().then(() => {
      const currentItems = Model.get()
      const newItems = {}
      items.forEach(
        ({ attributes, id, internals = {}, relationships } = {}) => {
          if (id === undefined) {
            throw new Error('Id required for bulk create')
          }

          newItems[id] = { attributes, id, internals, relationships }
        }
      )

      const updateItems = {
        ...currentItems,
        ...newItems,
      }
      Model.set(updateItems)
      log.debug(`Successfully created ${items.length} items`)
      return { meta: { count: items.length } }
    })
  })
}
