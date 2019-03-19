const testCases = require('./testCases')
const constants = require('../constants')
const createAggregationTest = require('../../utilities/createAggregationTest')

createAggregationTest({
  ...constants,
  aggregationFunction: 'aggregateRemarksTextPreview',
  aggregationType: 'previewTest',
  testCases,
})
