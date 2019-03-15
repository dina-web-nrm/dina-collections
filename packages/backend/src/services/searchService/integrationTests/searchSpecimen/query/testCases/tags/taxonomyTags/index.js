const tagTypeAggregationTestCases = require('./tagType')
const tagValueAggregationTagTypeFilterTestCases = require('./tagValue/tagTypeFilter')
const tagValueAggregationTagValueFilterTestCases = require('./tagValue/tagValueFilter')
// const tagValueAggregationTagTypeTagValueFilterTestCases = require('./tagValue/tagTypeTagValueFilter')

const filterFunction = 'searchTaxonomyTags'
const tagPath = 'attributes.tags.taxonomyTags'
const resource = 'taxonomyTag'
const typeAggregationFunction = 'aggregateTaxonomyTagTypes'
const valueAggregationFunction = 'aggregateTaxonomyTagValues'

module.exports = {
  tagTypeAggregation: {
    aggregationFunction: typeAggregationFunction,
    aggregationType: 'tagTypes',
    filterFunction,
    resource,
    tagPath,
    testCases: tagTypeAggregationTestCases,
  },
  tagValueAggregationTagTypeFilter: {
    aggregationFunction: valueAggregationFunction,
    aggregationType: 'tagValues',
    filterFunction,
    resource,
    tagPath,
    testCases: tagValueAggregationTagTypeFilterTestCases,
  },
  // tagValueAggregationTagTypeTagValueFilter: {
  //   aggregationFunction: valueAggregationFunction,
  //   aggregationType: 'tagValues',
  //   filterFunction,
  //   resource,
  //   tagPath,
  //   testCases: tagValueAggregationTagTypeTagValueFilterTestCases,
  // },
  tagValueAggregationTagValueFilter: {
    aggregationFunction: valueAggregationFunction,
    aggregationType: 'tagValues',
    filterFunction,
    resource,
    tagPath,
    testCases: tagValueAggregationTagValueFilterTestCases,
  },
}
