const asterisk = require('./asterisk')
const asteriskAndPhrase = require('./asteriskAndPhrase')
const asteriskAndSpace = require('./asteriskAndSpace')
const asteriskAndWholeField = require('./asteriskAndWholeField')
const equal = require('./equal')
const invalidInput = require('./invalidInput')
const noSpecialOperators = require('./noSpecialOperators')
const phrases = require('./phrases')
const space = require('./space')
const specialCases = require('./specialCases')
const wholeField = require('./wholeField')

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
  asteriskAndWholeField: {
    testCases: asteriskAndWholeField,
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
  specialCases: {
    testCases: specialCases,
  },
  wholeField: {
    testCases: wholeField,
  },
}
