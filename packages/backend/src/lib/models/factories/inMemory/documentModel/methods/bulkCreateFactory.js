const bulkCreateWrapper = require('../../../wrappers/methods/bulkCreate')
const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/models/factories/inMemory/documentModel/methods/bulkCreateFactory'
)

module.exports = function bulkCreateFactory({ Model }) {
  return bulkCreateWrapper(({ items, collidingIdPrefix, requireId }) => {
    return Promise.resolve().then(() => {
      if (requireId === false) {
        throw new Error('Id required for in memory model')
      }

      const currentItems = Model.get()
      const updatedItems = {
        ...currentItems,
      }

      const addItem = ({
        attributes,
        id,
        internals = {},
        relationships,
      } = {}) => {
        if (updatedItems[id] !== undefined) {
          if (!collidingIdPrefix) {
            throw new Error(`Id ${id} already exist`)
          }
          const updatedId = `${collidingIdPrefix}${id}`
          log.warning(`Id ${id} already exist. Using: ${updatedId} instead`)
          addItem({
            attributes,
            id: updatedId,
            internals,
            relationships,
          })
          //
        } else {
          updatedItems[id] = { attributes, id, internals, relationships }
        }
      }

      items.forEach(item => {
        if (item.id === undefined) {
          throw new Error('Id required for bulk create')
        }
        addItem(item)
      })

      Model.set(updatedItems)
      log.info(`Successfully created ${items.length} items`)
      return { meta: { count: items.length } }
    })
  })
}
