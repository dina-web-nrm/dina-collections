const caseSensitivity = require('./caseSensitivity')
const complexCases = require('./complexCases')
const notSupportedCases = require('./notSupportedCases')
const phrase = require('./phrase')
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
  phrase: {
    testCases: phrase,
  },
  simple: {
    testCases: simple,
  },
}
