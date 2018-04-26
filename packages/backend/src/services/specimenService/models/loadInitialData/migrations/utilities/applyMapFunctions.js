const chainPromises = require('common/src/chainPromises')

module.exports = function applyMapFunctions({ rawSpecimen, mapFunctions }) {
  return chainPromises(mapFunctions, {
    rawSpecimen,
    specimen: {},
  }).then(({ specimen }) => {
    return specimen
  })
}
