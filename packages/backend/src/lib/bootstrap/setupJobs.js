const createWorker = require('../jobs/worker')
const createScheduler = require('../jobs/scheduler')

module.exports = function setupJobs({
  config,
  log,
  schedulerActive,
  serviceInteractor,
  workerActive,
}) {
  if (workerActive) {
    log.info(`Starting worker with role: ${config.jobs.workerRole}`)
    createWorker({
      config,
      serviceInteractor,
    })
  } else {
    log.info('Dont starting worker')
  }

  if (schedulerActive) {
    log.info('Starting scheduler')
    createScheduler({
      serviceInteractor,
    })
  } else {
    log.info('Dont starting scheduler')
  }
}
