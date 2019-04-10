const relationshipKeys = [
  'normalizedAgents',
  'physicalObjects',
  'places',
  'taxa',
]

const relationshipIndexes = relationshipKeys.map(relationship => {
  return {
    name: `idx_specimen_rel_${relationship}`,
    relationship,
  }
})

module.exports = {
  down: ({ queryInterface }) => {
    const promises = relationshipIndexes.map(({ name }) => {
      return queryInterface.sequelize.query(`DROP INDEX ${name}`)
    })
    return Promise.all(promises)
  },
  up: ({ queryInterface }) => {
    const promises = relationshipIndexes.map(({ name, relationship }) => {
      return queryInterface.sequelize.query(
        `CREATE INDEX ${name} ON specimens USING gin ((relationships->'${relationship}'->'data'));`
      )
    })
    return Promise.all(promises)
  },
}
