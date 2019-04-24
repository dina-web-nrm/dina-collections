const caseSensitivity = require('./caseSensitivity')
const complexCases = require('./complexCases')
const notSupportedCases = require('./notSupportedCases')
const simple = require('./simple')

module.exports = {
  caseSensitivity: {
    testCases: caseSensitivity,
  },
  complexCases: {
    testCases: complexCases,
  },
  notSupportedCases: {
    testCases: notSupportedCases,
  },
  simple: {
    testCases: simple,
  },
}
