const testCases = require('./testCases')
const constants = require('../constants')
const createAggregationTest = require('../../utilities/createAggregationTest')

createAggregationTest({
  ...constants,
  aggregationType: 'tagTypes',
  testCases,
})
