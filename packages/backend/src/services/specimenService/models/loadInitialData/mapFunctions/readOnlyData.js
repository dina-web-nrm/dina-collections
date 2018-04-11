const immutable = require('object-path-immutable')

module.exports = function readOnlyData({ rawSpecimen, specimen }) {
  const toPath = 'individual.readOnly'
  return {
    rawSpecimen,
    specimen: immutable.set(specimen, toPath, rawSpecimen),
  }
}
