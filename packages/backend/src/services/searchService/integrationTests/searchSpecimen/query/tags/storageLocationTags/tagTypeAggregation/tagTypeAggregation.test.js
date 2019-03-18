const testCases = require('./index')
const constants = require('../constants')
const createTagTest = require('../../utilities/createTagTest')

createTagTest({
  ...constants,
  aggregationType: 'tagTypes',
  testCases,
})
