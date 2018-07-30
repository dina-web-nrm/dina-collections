const rebuildView = require('../../views/rebuildView')

module.exports = function importDataFromFile({
  operation,
  models,
  serviceInteractor,
}) {
  const {
    resource,
    transformationSpecification: { srcFileName } = {},
  } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }

  if (!srcFileName) {
    throw new Error(`Filename not provided for ${resource}`)
  }

  const rebuild = rebuildView({
    models,
    operation,
    serviceInteractor,
  })

  return ({ request }) => {
    return rebuild({ request })
  }
}
