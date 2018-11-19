const asyncReduce = require('common/src/asyncReduce')

module.exports = function createGlobals({
  globalDecorators,
  serviceInteractor,
}) {
  return asyncReduce({
    initialValue: {},
    items: globalDecorators,
    reduceFunction: ({ item: globalDecorator, value: globals }) => {
      return globalDecorator({
        globals,
        serviceInteractor,
      }).then(() => {
        return globals
      })
    },
  })
}
