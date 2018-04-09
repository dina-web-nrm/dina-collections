const { isEqual } = require('lodash')
const normalizeSpecimen = require('../normalizeSpecimen')
const denormalizeSpecimen = require('../denormalizeSpecimen')

module.exports = function verifySpecimenNormalization(normalizedSpecimenInput) {
  const denormalized = denormalizeSpecimen(normalizedSpecimenInput)
  const renormalized = normalizeSpecimen(denormalized)
  if (!isEqual(normalizedSpecimenInput, renormalized)) {
    throw new Error('Renormalization not same as normalized version')
  }
}
