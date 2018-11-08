const chainPromises = require('common/src/chainPromises')

module.exports = function createRelations({ models, modelArray }) {
  return chainPromises(
    modelArray.map(({ model }) => {
      return () => {
        if (model.setupRelations) {
          return Promise.resolve().then(() => {
            model.setupRelations({ models })
          })
        }
        return true
      }
    })
  )
}
