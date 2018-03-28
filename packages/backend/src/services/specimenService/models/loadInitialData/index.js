const mapSpecimen = require('./mapSpecimen')
const rawSpecimens = require('./specimens.json')

module.exports = function loadInitialData({ models }) {
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
