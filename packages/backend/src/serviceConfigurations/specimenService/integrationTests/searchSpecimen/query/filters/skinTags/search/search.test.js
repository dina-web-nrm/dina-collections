const testCases = require('./testCases')
const constants = require('../constants')
const createSearchTest = require('../../utilities/createSearchTest')

createSearchTest({
  ...constants,
  testCases,
})
