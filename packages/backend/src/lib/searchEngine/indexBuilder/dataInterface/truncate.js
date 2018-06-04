module.exports = function truncate({ models, type }) {
  return Promise.resolve().then(() => {
    const model = models[type]
    if (!model) {
      throw new Error(`No model found for type: ${type}`)
    }

    if (type === 'stageSpecimen' || type === 'searchSpecimen') {
      return model.Model.destroy({ truncate: true })
    }

    throw new Error(`Not allowed to truncate table with type ${type}`)
  })
}
