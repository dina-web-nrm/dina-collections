import debounce from 'lodash.debounce'
import createLog from 'utilities/log'

const log = createLog('modules:keyboardShortcuts:utilities')

export const createDelayedResetQueue = ({ resetTime, queue }) => {
  return debounce(() => {
    log.debug('Debounce empty queue')
    queue.length = 0 // eslint-disable-line no-param-reassign
  }, resetTime)
}

export const createForceResetQueue = ({ resetQueue, queue }) => {
  return function forceResetQueue() {
    log.debug('Force empty queue')
    queue.length = 0 // eslint-disable-line no-param-reassign
    resetQueue.cancel()
  }
}

export const matchShortcut = ({ queue, shortcutSpecifications }) => {
  if (!queue.length) {
    return null
  }
  const string = queue.join('')
  log.debug(`matchShortcut - string: ${string}`)
  if (shortcutSpecifications[string]) {
    return shortcutSpecifications[string]
  }

  return null
}

const findShortcut = ({
  event,
  protectedTagMap,
  forceResetQueue,
  queue,
  resetQueue,
  shortcutSpecifications,
  startKey,
}) => {
  const { tagName } = event.target
  const { key } = event
  log.debug(`findShortcut - reveied event for key: ${key}`)
  if (!protectedTagMap[tagName] && (queue.length || key === startKey)) {
    log.debug(`findShortcut - Pushing key: ${key} to queue`)
    queue.push(key)
    const match = matchShortcut({ queue, shortcutSpecifications })
    if (match) {
      log.debug('findShortcut - Got match', match)
      forceResetQueue()
      return match
    }
    resetQueue()
  }
  return null
}

export const createFindShortcut = ({
  protectedTags = ['INPUT'],
  resetTime,
  startKey,
}) => {
  log.debug('createFindShortcut with: ', {
    protectedTags,
    resetTime,
    startKey,
  })
  const queue = []

  const resetQueue = createDelayedResetQueue({
    queue,
    resetTime,
  })

  const forceResetQueue = createForceResetQueue({
    queue,
    resetQueue,
  })

  const protectedTagMap = protectedTags.reduce((map, tag) => {
    return {
      ...map,
      [tag]: true,
    }
  }, {})

  return ({ event, shortcutSpecifications }) => {
    return findShortcut({
      event,
      forceResetQueue,
      protectedTagMap,
      queue,
      resetQueue,
      shortcutSpecifications,
      startKey,
    })
  }
}
