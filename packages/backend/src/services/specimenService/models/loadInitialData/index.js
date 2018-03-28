const readInitialData = require('../../../../utilities/readInitialData')
const mapSpecimen = require('./mapSpecimen')

module.exports = function loadInitialData({ models }) {
  const rawSpecimens = readInitialData('specimens')

  if (!rawSpecimens) {
    return Promise.resolve()
  }

  return Promise.all(
    rawSpecimens.map(rawSpecimen => {
      return mapSpecimen(rawSpecimen)
    })
  ).then(mappedSpecimens => {
    const items = mappedSpecimens.map((mappedSpecimen, index) => {
      return {
        doc: mappedSpecimen,
        id: index + 1,
      }
    })
    return models.specimen.bulkCreate(items)
  })
}
