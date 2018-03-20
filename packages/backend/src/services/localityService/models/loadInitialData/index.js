const localities = require('./localities.json')

module.exports = function loadInitialData({ models }) {
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

  return models.curatedLocality.bulkCreate(items)
}
