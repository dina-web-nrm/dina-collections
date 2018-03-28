const readInitialData = require('../../../../utilities/readInitialData')

module.exports = function loadInitialData({ models }) {
  const distinguishedUnitTypes = readInitialData('distinguishedUnitTypes')
  const featureTypes = readInitialData('featureTypes', { isJson: false })

  const featureObservationTypeItems = !featureTypes
    ? Promise.resolve()
    : featureTypes.map((featureType, index) => {
        return {
          doc: featureType,
          id: index + 1,
        }
      })

  const distinguishedUnitTypeItems = !distinguishedUnitTypes
    ? Promise.resolve()
    : distinguishedUnitTypes.map(distinguishedUnitType => {
        const { id, ...rest } = distinguishedUnitType
        return {
          doc: { ...rest },
          id,
        }
      })

  return Promise.all([
    models.featureObservationType.bulkCreate(featureObservationTypeItems),
    models.distinguishedUnitType.bulkCreate(distinguishedUnitTypeItems),
  ])
}
