module.exports = function extractSchemaFunctions({ key, migrations }) {
  return migrations
    .map(migration => {
      if (!migration[key]) {
        return null
      }
      return {
        ...migration,
        migrationFunction: migration[key],
      }
    })
    .filter(fn => {
      return !!fn
    })
}
