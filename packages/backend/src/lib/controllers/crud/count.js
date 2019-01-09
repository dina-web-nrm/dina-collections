const getManyFactory = require('./getMany')

module.exports = function count({ operation, models, ...rest }) {
  const { resource } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }

  const getMany = getManyFactory({
    models,
    operation,
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
