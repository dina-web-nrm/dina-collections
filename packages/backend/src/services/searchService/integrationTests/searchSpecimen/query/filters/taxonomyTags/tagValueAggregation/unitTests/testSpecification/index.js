const asterisk = require('./asterisk')
const asteriskAndPhrase = require('./asteriskAndPhrase')
const asteriskAndSpace = require('./asteriskAndSpace')
const equal = require('./equal')
const invalidInput = require('./invalidInput')
const noSpecialOperators = require('./noSpecialOperators')
const phrases = require('./phrases')
const space = require('./space')

module.exports = {
  asterisk: {
    testCases: asterisk,
  },
  asteriskAndPhrase: {
    testCases: asteriskAndPhrase,
  },
  asteriskAndSpace: {
    testCases: asteriskAndSpace,
  },
  equal: {
    testCases: equal,
  },
  invalidInput: {
    testCases: invalidInput,
  },
  noSpecialOperators: {
    testCases: noSpecialOperators,
  },
  phrases: {
    testCases: phrases,
  },
  space: {
    testCases: space,
  },
}
