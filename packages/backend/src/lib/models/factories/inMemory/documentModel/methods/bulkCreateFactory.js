const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/models/factories/inMemory/documentModel/methods/bulkCreateFactory'
)

module.exports = function bulkCreateFactory({ Model }) {
  return function bulkCreate({ items = [] }) {
    return Promise.resolve().then(() => {
      const currentItems = Model.get()
      const newItems = {}
      items.forEach(({ doc, id } = {}) => {
        if (id === undefined) {
          throw new Error('Id required for bulk create')
        }

        newItems[id] = { document: doc, id }
      })

      const updateItems = {
        ...currentItems,
        ...newItems,
      }
      const res = Model.set(updateItems)
      log.debug(`Successfully created ${items.length} items`)
      return res
    })
  }
}
