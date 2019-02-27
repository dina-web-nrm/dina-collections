const createLog = require('../../../utilities/log')
const execute = require('./execute')
const findNext = require('./findNext')

const log = createLog('lib/jobs/worker')

const workerRoleJobGroupMapping = {
  all: {},
  'search-index': {
    includeGroups: ['search-index'],
  },
  simple: {
    excludeGroups: ['search-index'],
  },
}

module.exports = function createWorker({
  config,
  idleDelay = 200,
  pollDelay = 1000,
  serviceInteractor,
}) {
  let excludeGroups = []
  let includeGroups = []
  if (!config.jobs.workerRole) {
    throw new Error(`Worker role is required`)
  }

  const activeWorkerRole = workerRoleJobGroupMapping[config.jobs.workerRole]
  if (!activeWorkerRole) {
    throw new Error(
      `Unknown worker role: ${
        config.jobs.workerRole
      }. Pick one of [${Object.keys(workerRoleJobGroupMapping).join(', ')}]`
    )
  }

  if (activeWorkerRole.includeGroups) {
    includeGroups = activeWorkerRole.includeGroups // eslint-disable-line
  }

  if (activeWorkerRole.excludeGroups) {
    excludeGroups = activeWorkerRole.excludeGroups // eslint-disable-line
  }

  log.info('Start worker')
  let active = false
  const run = () => {
    if (!active) {
      return null
    }
    log.debug('Looking for next job')
    return findNext({
      excludeGroups,
      includeGroups,
      serviceInteractor,
    })
      .then(job => {
        if (!job) {
          log.debug('No jobs found')
          return false
        }
        log.info(`Job with id :${job.id} found`)
        return execute({
          job,
          serviceInteractor,
        }).then(() => {
          return true
        })
      })
      .then(jobExecuted => {
        if (jobExecuted) {
          return setTimeout(() => {
            run()
          }, idleDelay)
        }
        return setTimeout(() => {
          run()
        }, pollDelay)
      })
      .catch(err => {
        log.err('Error in run', err)
        return setTimeout(() => {
          run()
        }, idleDelay)
      })
  }

  const start = () => {
    log.info('Worker starting')
    active = true
    run()
  }

  const stop = () => {
    log.info('Worker stopping')
    active = false
  }

  start()

  return {
    start,
    stop,
  }
}
