const bootstrapBase = require('./bootstrapBase')
const createFileInteractor = require('../fileInteractor')
const importer = require('../importer')

module.exports = function bootstrapData({
  env,
  importData = true,
  rebuildElastic = true,
  serviceDefinitions,
  serviceOrder,
}) {
  const main = ({ config, serviceInteractor }) => {
    const fileInteractor = createFileInteractor({ config })
    return importer({
      config,
      fileInteractor,
      importData,
      rebuildElastic,
      serviceInteractor,
    }).then(() => {
      return null
    })
  }

  return bootstrapBase({
    env,
    main,
    serviceDefinitions,
    serviceOrder,
  })
}
