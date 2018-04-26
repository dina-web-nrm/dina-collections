const readInitialData = require('../../../../utilities/readInitialData')

module.exports = function loadInitialData({ models }) {
  const typeSpecimenTypes = readInitialData('typeSpecimenTypes')
  const establishmentMeansTypes = readInitialData('establishmentMeansTypes')
  const causeOfDeathTypes = readInitialData('causeOfDeathTypes')
  const preparationTypes = readInitialData('preparationTypes')
  const featureTypes = readInitialData('featureTypes', { isJson: false })

  const typeSpecimenTypesItems = !typeSpecimenTypes
    ? null
    : typeSpecimenTypes.map((typeSpecimenType, index) => {
        return {
          doc: typeSpecimenType,
          id: index + 1,
        }
      })

  const establishmentMeansTypeItems = !establishmentMeansTypes
    ? null
    : establishmentMeansTypes.map((establishmentMeansType, index) => {
        return {
          doc: establishmentMeansType,
          id: index + 1,
        }
      })

  const causeOfDeathTypeItems = !causeOfDeathTypes
    ? null
    : causeOfDeathTypes.map((causeOfDeathType, index) => {
        return {
          doc: causeOfDeathType,
          id: index + 1,
        }
      })

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

  const typeSpecimenTypesItemsPromises = typeSpecimenTypesItems
    ? models.typeSpecimenType.bulkCreate(typeSpecimenTypesItems)
    : Promise.resolve()

  const establishmentMeansTypeItemsPromises = establishmentMeansTypeItems
    ? models.establishmentMeansType.bulkCreate(establishmentMeansTypeItems)
    : Promise.resolve()

  const causeOfDeathTypeItemsPromise = causeOfDeathTypeItems
    ? models.causeOfDeathType.bulkCreate(causeOfDeathTypeItems)
    : Promise.resolve()

  const featureTypeItemsPromise = featureTypeItems
    ? models.featureType.bulkCreate(featureTypeItems)
    : Promise.resolve()

  const preparationTypeItemsPromise = preparationTypeItems
    ? models.preparationType.bulkCreate(preparationTypeItems)
    : Promise.resolve()

  return Promise.all([
    causeOfDeathTypeItemsPromise,
    establishmentMeansTypeItemsPromises,
    featureTypeItemsPromise,
    preparationTypeItemsPromise,
    typeSpecimenTypesItemsPromises,
  ])
}
