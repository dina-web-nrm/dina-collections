const immutable = require('object-path-immutable')

module.exports = function readOnlyData({ rawSpecimen, specimen }) {
  const toPath = 'individualGroup.readOnly'
  return {
    rawSpecimen,
    specimen: immutable.set(specimen, toPath, rawSpecimen),
  }
}
