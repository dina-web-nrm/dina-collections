const { createSelector } = require('reselect')

const createKeyColumnMap = require('./createKeyColumnMap')

module.exports = createSelector(
  ({ models }) => models,
  models => {
    return Object.keys(models).reduce((specifications, modelKey) => {
      const keyColumnMap = createKeyColumnMap(models[modelKey])

      if (keyColumnMap && Object.keys(keyColumnMap)) {
        return {
          ...specifications,
          [modelKey]: keyColumnMap,
        }
      }

      return specifications
    }, {})
  }
)
