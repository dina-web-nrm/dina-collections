/* eslint-disable no-console */

const debug = require('debug')

const APP_PREFIX = 'DINA'

const priorityMap = {
  alert: { output: 'error', priority: 'LOG_ALERT' },
  crit: { output: 'error', priority: 'LOG_CRIT' },
  debug: { output: 'log', priority: 'LOG_DEBUG' },
  emerg: { output: 'log', priority: 'LOG_EMERG' },
  err: { output: 'error', priority: 'LOG_ERR' },
  info: { output: 'log', priority: 'LOG_INFO' },
  notice: { output: 'log', priority: 'LOG_NOTICE' },
  warning: { output: 'error', priority: 'LOG_WARNING' },
}

const createLevelLogFunction = ({ context, output, priority }) => {
  const log = debug(`${APP_PREFIX}:${priority}:${context}`)
  if (output === 'log') {
    log.log = console.log.bind(console)
  }
  if (output === 'error') {
    log.log = console.error.bind(console)
  }

  return log
}

module.exports = function createLog(context) {
  return Object.keys(priorityMap).reduce((log, level) => {
    const { priority, output } = priorityMap[level]

    return {
      ...log,
      [level]: createLevelLogFunction({ context, output, priority }),
    }
  }, {})
}
