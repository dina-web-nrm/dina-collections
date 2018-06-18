/* eslint-disable no-param-reassign */
const objectPath = require('object-path')

module.exports = ({ src, target }) => {
  const identifiers = objectPath.get(src, 'individual.identifiers')
  if (!identifiers) {
    return null
  }

  target.identifiers = identifiers
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
  return null
}
