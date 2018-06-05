const createTestLog = require('../../log/testLog')

const log = createTestLog('error')

module.exports = function logError({
  code,
  description,
  parameterErrors,
  stack,
  title,
}) {
  log.err(`${code}: ${title}`)
  log.scope().err(description)

  if (parameterErrors) {
    log.scope().err(JSON.stringify(parameterErrors || [], null, 2))
  }

  log.scope().err(stack)
}
