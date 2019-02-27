const leftPad = require('left-pad')
const { prefix } = require('../constants')
const incrementNumber = require('./incrementNumber')
const validateCatalogNumberFormat = require('./validateCatalogNumberFormat')

module.exports = function generateCatalogNumber({ year, prevNumber }) {
  const newNumber = incrementNumber(prevNumber)
  const paddedNumber = leftPad(newNumber, 4, '0')
  const identifier = `${prefix}${year}${paddedNumber}`
  validateCatalogNumberFormat(identifier)
  return {
    identifier,
    newNumber,
  }
}
