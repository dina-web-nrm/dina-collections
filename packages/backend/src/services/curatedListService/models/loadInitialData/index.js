const readInitialData = require('../../../../utilities/readInitialData')

module.exports = function loadInitialData({ models }) {
  const preparationTypes = readInitialData('preparationTypes')
  const featureTypes = readInitialData('featureTypes', { isJson: false })

  const featureTypeItems = !featureTypes
    ? null
    : featureTypes.map((featureType, index) => {
        return {
          doc: featureType,
          id: index + 1,
        }
      })

  const preparationTypeItems = !preparationTypes
    ? null
    : preparationTypes.map(preparationType => {
        const { id, ...rest } = preparationType
        return {
          doc: { ...rest },
          id,
        }
      })

  const featureTypeItemsPromise = featureTypeItems
    ? models.featureType.bulkCreate(featureTypeItems)
    : Promise.resolve()

  const preparationTypeItemsPromise = preparationTypeItems
    ? models.preparationType.bulkCreate(preparationTypeItems)
    : Promise.resolve()

  return Promise.all([featureTypeItemsPromise, preparationTypeItemsPromise])
}
