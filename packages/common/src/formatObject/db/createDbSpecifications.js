const createKeyColumnMap = require('../utilities/createKeyColumnMap')

module.exports = function createDbSpecifications({ models = {} } = {}) {
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
