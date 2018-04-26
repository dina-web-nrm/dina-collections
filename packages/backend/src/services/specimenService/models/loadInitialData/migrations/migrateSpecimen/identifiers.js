module.exports = function createIdentifiers({ migrator }) {
  // catalogNumber

  migrator.migrateValue({
    format: 'string',
    fromPath: 'src.catalogNumber',
    toPath: 'target.individual.identifiers.0.value',
  })

  migrator.setValue({
    condition: migrator.valueExist({
      path: 'target.individual.identifiers.0.value',
    }),
    path: 'target.individual.identifiers.0.identifierType',
    value: 'catalogNumber',
  })
}
