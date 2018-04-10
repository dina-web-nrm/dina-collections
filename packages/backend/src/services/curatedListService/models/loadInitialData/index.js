const readInitialData = require('../../../../utilities/readInitialData')

module.exports = function loadInitialData({ models }) {
  const distinguishedUnitTypes = readInitialData('distinguishedUnitTypes')
  const featureTypes = readInitialData('featureTypes', { isJson: false })

  const featureTypeItems = !featureTypes
    ? null
    : featureTypes.map((featureType, index) => {
        return {
          doc: featureType,
          id: index + 1,
        }
      })

  const distinguishedUnitTypeItems = !distinguishedUnitTypes
    ? null
    : distinguishedUnitTypes.map(distinguishedUnitType => {
        const { id, ...rest } = distinguishedUnitType
        return {
          doc: { ...rest },
          id,
        }
      })

  const featureTypeItemsPromise = featureTypeItems
    ? models.featureType.bulkCreate(featureTypeItems)
    : Promise.resolve()

  const distinguishedUnitTypeItemsPromise = distinguishedUnitTypeItems
    ? models.distinguishedUnitType.bulkCreate(distinguishedUnitTypeItems)
    : Promise.resolve()

  return Promise.all([
    featureTypeItemsPromise,
    distinguishedUnitTypeItemsPromise,
  ])
}
