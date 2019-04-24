const getManyFactory = require('../getMany/controllerFactory')

module.exports = function count({ operationSpecification, models, ...rest }) {
  const { resource } = operationSpecification
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }

  const getMany = getManyFactory({
    models,
    operationSpecification,
    responseFormat: 'object',
    ...rest,
  })

  return input => {
    return getMany({ ...input, count: true }).then(res => {
      return {
        data: {
          attributes: {
            count: res.meta.count,
          },
        },
      }
    })
  }
}
