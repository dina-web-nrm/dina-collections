const readInitialData = require('../../../../utilities/readInitialData')

module.exports = function loadInitialData({ models }) {
  const localities = readInitialData('localities')

  if (!localities) {
    return Promise.resolve()
  }

  const items = localities.map(locality => {
    const { name, level, id, parentId } = locality

    const attributes = {
      group: level === 'continentOcean' ? 'continent' : level,
      name,
    }
    return {
      attributes,
      id,
      internals: {
        parentId,
      },
    }
  })

  return models.place.bulkCreate({ items })
}
