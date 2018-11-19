/* eslint-disable no-param-reassign */

/*
example src data
  "identifiers": [
    {
      "identifierType_key": "catalog-no",
      "value": "584072"
    },
    {
      "identifierType_key": "old-skeleton-no",
      "value": "4072/1.860"
    }
  ],
*/

module.exports = function migrateIdentifiers({
  globals,
  migrator,
  reporter,
  src,
  target,
}) {
  const srcIdentifiers = migrator.getValue({
    obj: src,
    path: 'migrationData.identifiers',
    strip: true,
  })

  if (!srcIdentifiers) {
    return
  }

  const identifiers = srcIdentifiers
    .map(srcIdentifier => {
      const id = migrator.getFromGlobals({
        globals,
        key: srcIdentifier.identifierType_key,
        mapKey: 'identifierTypeKeyIdMap',
        reporter,
      })
      if (!(id && srcIdentifier.value)) {
        return null
      }
      return {
        identifierType: {
          id,
        },
        value: srcIdentifier.value,
      }
    })
    .filter(identifier => {
      return !!identifier
    })

  migrator.setValue({
    obj: target,
    path: 'attributes.individual.identifiers',
    value: identifiers,
  })
}
