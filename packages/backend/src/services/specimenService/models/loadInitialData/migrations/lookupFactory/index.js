const getPlace = require('./getPlace')
const getPreparationType = require('./getPreparationType')
const getStorageLocation = require('./getStorageLocation')

module.exports = function createLookupFactory({ reporter }) {
  return {
    getPlace: ({ srcParameter, value }) => {
      return getPlace({
        reporter,
        srcParameter,
        value,
      })
    },
    getPreparationType: ({ srcParameter, value }) => {
      return getPreparationType({
        reporter,
        srcParameter,
        value,
      })
    },
    getStorageLocation: ({ srcParameter, value }) => {
      return getStorageLocation({
        reporter,
        srcParameter,
        value,
      })
    },
  }
}
