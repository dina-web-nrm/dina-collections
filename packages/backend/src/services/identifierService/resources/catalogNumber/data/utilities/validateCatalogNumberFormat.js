const { prefix } = require('../constants')

module.exports = function validateCatalogNumberFormat(
  catalogNumberIdentifier = ''
) {
  const nCharacters = catalogNumberIdentifier.length
  if (![6, 8, 10].includes(nCharacters)) {
    throw new Error(
      `Identifier: ${catalogNumberIdentifier} has wrong length. got: ${
        nCharacters
      } expected 6,8 or 10`
    )
  }

  if (nCharacters === 10) {
    if (catalogNumberIdentifier.indexOf(prefix) !== 0) {
      throw new Error(
        `A 10 character long catalogNumber should start with ${prefix}`
      )
    }
  }
}
