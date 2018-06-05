const extractModelFunctionsFromServices = require('./utilities/extractModelFunctionsFromServices')

module.exports = function createRelations({ services, models }) {
  const setupRelationFunctions = extractModelFunctionsFromServices({
    functionType: 'setupRelations',
    services,
  })
  return Promise.all(
    setupRelationFunctions.map(({ modelFunction }) => {
      return Promise.resolve(
        modelFunction({
          models,
        })
      )
    })
  )
}
