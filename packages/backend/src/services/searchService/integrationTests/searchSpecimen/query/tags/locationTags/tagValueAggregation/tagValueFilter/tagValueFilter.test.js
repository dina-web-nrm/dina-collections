const testCases = require('./testCases')
const constants = require('../../constants')
const createTagTest = require('../../../utilities/createTagTest')

createTagTest({
  ...constants,
  aggregationType: 'tagValues',
  filterType: 'tagValue',
  testCases,
})
