module.exports = function createReadOnly({ migrator }) {
  migrator.migrateValue({
    fromPath: 'src',
    toPath: 'target.individual.readOnly',
  })
}
