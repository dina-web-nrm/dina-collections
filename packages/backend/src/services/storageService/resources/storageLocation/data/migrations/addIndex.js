const relationshipIndexes = [
  {
    name: 'idx_storageLocation_rel_taxa',
    relationship: 'taxa',
  },
]

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
        `CREATE INDEX ${name} ON "storageLocations" USING gin ((relationships->'${relationship}'->'data'));`
      )
    })
    return Promise.all(promises)
  },
}
