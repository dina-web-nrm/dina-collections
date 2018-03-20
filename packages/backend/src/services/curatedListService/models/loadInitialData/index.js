const condition = require('./condition')
const sex = require('./sex')
const ageStage = require('./ageStage')
const boneCount = require('./boneCount')
const length = require('./length')
const weight = require('./weight')

const featureTypes = [
  ...ageStage,
  ...condition,
  ...boneCount,
  ...length,
  ...sex,
  ...weight,
]

module.exports = function loadInitialData({ models }) {
  const items = featureTypes.map((featureType, index) => {
    return {
      doc: featureType,
      id: index + 1,
    }
  })

  return models.featureObservationType.bulkCreate(items)
}
