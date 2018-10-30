const bootstrapBase = require('./bootstrapBase')
const importer = require('../importer')

module.exports = function bootstrapData({
  env,
  serviceDefinitions,
  serviceOrder,
}) {
  const main = ({ config, serviceInteractor }) => {
    return importer({
      config,
      serviceInteractor,
    })
  }

  return bootstrapBase({
    env,
    main,
    serviceDefinitions,
    serviceOrder,
  })
}
