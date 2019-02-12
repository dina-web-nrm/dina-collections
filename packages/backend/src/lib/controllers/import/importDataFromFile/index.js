const rebuildView = require('../../views/rebuildView')

module.exports = function importDataFromFile(options) {
  const { operation, models } = options
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

  const rebuild = rebuildView(options)

  return ({ request }) => {
    return rebuild({ request })
  }
}
