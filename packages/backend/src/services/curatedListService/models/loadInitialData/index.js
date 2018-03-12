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
  const { create } = models.featureObservationType
  const promises = featureTypes.map(featureType => {
    return create(featureType)
  })
  return Promise.all(promises)
}
