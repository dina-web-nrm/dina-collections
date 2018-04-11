const batchExecute = require('../../../../utilities/test/batchExecute')
const readInitialData = require('../../../../utilities/readInitialData')
const mapSpecimen = require('./mapSpecimen')

module.exports = function loadInitialData({ models }) {
  const specimenTemplate = readInitialData('specimens')
  if (!specimenTemplate) {
    return Promise.resolve()
  }

  const createEntry = index => {
    return specimenTemplate[index % specimenTemplate.length]
  }

  let id = 0
  return batchExecute({
    createEntry,
    execute: items => {
      return Promise.all(
        items.map(rawSpecimen => {
          return mapSpecimen(rawSpecimen)
        })
      ).then(mappedSpecimens => {
        const tmp = mappedSpecimens.map(mappedSpecimen => {
          id += 1
          return {
            doc: mappedSpecimen,
            id,
          }
        })
        return models.specimen.bulkCreate(tmp)
      })
    },
    numberOfEntries: 100,
    numberOfEntriesEachBatch: 10,
  })
}
