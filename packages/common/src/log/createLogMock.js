const priorityMap = require('./priorityMap')

module.exports = function createLogMock(context, scopeLevel = 0) {
  const createScopedLog = () => {
    return createLogMock(context, scopeLevel + 1)
  }

  return Object.keys(priorityMap).reduce(
    (log, level) => {
      return {
        ...log,
        [level]: jest.fn(),
      }
    },
    { scope: createScopedLog, scopeLevel }
  )
}
