/* eslint-disable no-param-reassign */

module.exports = ({ migrator, src, target }) => {
  const identifiers = migrator.getValue({
    obj: src,
    path: 'individual.identifiers',
  })

  if (!identifiers) {
    return null
  }

  const transformedIdentifiers = identifiers
    .map(identifier => {
      const { value, identifierType: { key } = {} } = identifier

      if (!(key && value !== undefined)) {
        return null
      }
      return `${value} (${key})`
    })
    .filter(identifier => {
      return !!identifier
    })

  migrator.setValue({
    obj: target,
    path: 'attributes.identifiers',
    value: transformedIdentifiers,
  })

  return null
}
