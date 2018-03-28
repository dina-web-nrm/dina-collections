const readInitialData = require('../../../../utilities/readInitialData')

module.exports = function loadInitialData({ models }) {
  const featureTypes = readInitialData('featureTypes', { isJson: false })

  if (!featureTypes) {
    return Promise.resolve()
  }

  const items = featureTypes.map((featureType, index) => {
    return {
      doc: featureType,
      id: index + 1,
    }
  })

  return models.featureObservationType.bulkCreate(items)
}
