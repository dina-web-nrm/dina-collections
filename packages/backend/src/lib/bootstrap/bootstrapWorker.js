const bootstrapBase = require('./bootstrapBase')
const setupJobs = require('./setupJobs')

module.exports = function bootstrapWorker({
  env,
  schedulerActive = true,
  serviceDefinitions,
  serviceOrder,
  workerActive = true,
}) {
  const main = ({ log, serviceInteractor }) => {
    setupJobs({
      log,
      schedulerActive,
      serviceInteractor,
      workerActive,
    })

    return null
  }

  return bootstrapBase({
    env,
    main,
    serviceDefinitions,
    serviceOrder,
  })
}
