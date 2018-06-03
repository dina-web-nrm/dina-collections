/* eslint-disable no-param-reassign */
const objectPath = require('object-path')

module.exports = ({ src, target }) => {
  const identifiers = objectPath.get(src, 'individual.identifiers')
  if (!identifiers) {
    return null
  }
  let catalogNumber

  identifiers.forEach(identifier => {
    if (!catalogNumber) {
      const { value, identifierType: { key } = {} } = identifier

      if (key === 'catalog-number') {
        catalogNumber = value
      }
    }
  })

  if (catalogNumber) {
    target.catalogNumber = catalogNumber
  }

  return null
}
