const testCases = require('./testCases')
const constants = require('../constants')
const createAggregationTest = require('../../utilities/createAggregationTest')

createAggregationTest({
  ...constants,
  aggregationFunction: 'aggregateRemarksTextPreview',
  aggregationType: 'previewTest',
  preprocessItems: items => {
    return items.map(item => {
      return {
        ...item,
        attributes: {
          ...item.attributes,
          tagValue: item.attributes.tagValue
            ? item.attributes.tagValue
                .replace(/<strong>+/g, '')
                .replace(/<\/strong>+/g, '')
            : item.attributes.tagValue,
        },
      }
    })
  },
  testCases,
})
