const readInitialData = require('../../../../utilities/readInitialData')

module.exports = function loadInitialData({ models }) {
  const localities = readInitialData('localities')

  if (!localities) {
    return Promise.resolve()
  }

  const items = localities.map(locality => {
    const { name, level, id, parentId } = locality

    const doc = {
      group: level === 'continentOcean' ? 'continent' : level,
      name,
    }
    return {
      doc,
      id,
      parentVersionId: parentId,
    }
  })

  return models.place.bulkCreate(items)
}
