const bootstrapBase = require('./bootstrapBase')
const setupJobs = require('./setupJobs')

module.exports = function bootstrapWorker({
  env,
  schedulerActive = true,
  serviceDefinitions,
  serviceOrder,
  workerActive = true,
}) {
  const main = ({ config, log, serviceInteractor }) => {
    setupJobs({
      config,
      log,
      schedulerActive,
      serviceInteractor,
      workerActive,
    })

    return { message: 'Worker started' }
  }

  return bootstrapBase({
    env,
    main,
    serviceDefinitions,
    serviceOrder,
  })
}
