import debug from 'debug'

export const APP_PREFIX = 'DINA'

export const priorityMap = {
  alert: 'LOG_ALERT',
  crit: 'LOG_CRIT',
  debug: 'LOG_DEBUG',
  emerg: 'LOG_EMERG',
  err: 'LOG_ERR',
  info: 'LOG_INFO',
  notice: 'LOG_NOTICE',
  warning: 'LOG_WARNING',
}

export const shortCuts = {
  mount: 'REACT:MOUNT',
  render: 'REACT:RENDER',
  unmount: 'REACT:UNMOUNT',
}

export const createShortcutLogFunction = ({ context, shortcut }) => {
  let count = 0
  const log = debug(`${APP_PREFIX}:${shortcut}:${context}`)
  return (message = '', ...rest) => {
    const countMessage = `Count: ${count}. ${message}`
    log(countMessage, ...rest)
    count += 1
  }
}

export const createLevelLogFunction = ({ context, priority }) => {
  return debug(`${APP_PREFIX}:${priority}:${context}`)
}

export default function createLog(context) {
  const priorityLog = Object.keys(priorityMap).reduce((log, level) => {
    const priority = priorityMap[level]
    return {
      ...log,
      [level]: createLevelLogFunction({ context, priority }),
    }
  }, {})

  const shortcutLog = Object.keys(shortCuts).reduce((log, shourcutKey) => {
    const shortcut = shortCuts[shourcutKey]
    return {
      ...log,
      [shourcutKey]: createShortcutLogFunction({
        context,
        shortcut,
      }),
    }
  }, {})

  return {
    ...priorityLog,
    ...shortcutLog,
  }
}
