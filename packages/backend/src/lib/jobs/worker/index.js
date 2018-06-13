const createLog = require('../../../utilities/log')
const execute = require('./execute')
const findNext = require('./findNext')

const log = createLog('lib/jobs/worker')

module.exports = function createWorker({
  idleDelay = 200,
  pollDelay = 1000,
  serviceInteractor,
}) {
  log.info('Start worker')
  let active = false
  const run = () => {
    if (!active) {
      return null
    }
    log.info('Looking for next job')
    return findNext({ serviceInteractor })
      .then(job => {
        if (!job) {
          log.info('No jobs found')
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
