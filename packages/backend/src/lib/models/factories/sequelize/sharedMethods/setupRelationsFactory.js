const createSetupRelations = require('../utilities/createSetupRelations')

module.exports = function setupRelationsFactory({ relations } = {}) {
  const setupFunction = createSetupRelations(relations)
  return function setupRelations({ models }) {
    return Promise.resolve().then(() => {
      return setupFunction({
        models,
      })
    })
  }
}
