const readInitialData = require('../../../../utilities/readInitialData')

const loadType = ({ initialDataName, modelName, models, isJson = true }) => {
  const types = readInitialData(initialDataName, { isJson })
  if (!types) {
    return Promise.resolve()
  }
  const items = types.map((type, index) => {
    return {
      doc: type,
      id: index + 1,
    }
  })

  return models[modelName].bulkCreate(items)
}

module.exports = function loadInitialData({ models }) {
  return Promise.all([
    loadType({
      initialDataName: 'identifierTypes',
      modelName: 'identifierType',
      models,
    }),
    loadType({
      initialDataName: 'causeOfDeathTypes',
      modelName: 'causeOfDeathType',
      models,
    }),
    loadType({
      initialDataName: 'establishmentMeansTypes',
      modelName: 'establishmentMeansType',
      models,
    }),
    loadType({
      initialDataName: 'featureTypes',
      isJson: false,
      modelName: 'featureType',
      models,
    }),
    loadType({
      initialDataName: 'preparationTypes',
      modelName: 'preparationType',
      models,
    }),
    loadType({
      initialDataName: 'typeSpecimenTypes',
      modelName: 'typeSpecimenType',
      models,
    }),
  ])
}
