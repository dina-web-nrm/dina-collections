const buildTagValueFilter = require('./buildTagValueFilter')

const buildRawTagTypesBody = ({ fieldPath, resource, testCase }) => {
  const tagTypePath = `${fieldPath}.tagType`
  const { filters: { tagTypes = undefined } = {} } = testCase

  let query

  // Build aggregations

  const keyAggregation = {
    tagType: {
      terms: {
        field: tagTypePath,
        size: 100,
      },
    },
  }

  let aggregationFilter = {}

  const bool = {
    must: [],
    should: [],
  }

  if (tagTypes) {
    tagTypes.forEach(tagType => {
      bool.should.push({
        term: {
          [tagTypePath]: tagType,
        },
      })
    })
  }

  aggregationFilter = {
    bool,
  }

  const aggregations = {
    [resource]: {
      aggs: {
        filter: {
          aggs: keyAggregation,
          filter: aggregationFilter,
        },
      },
      nested: {
        path: fieldPath,
      },
    },
  }

  return {
    data: {
      attributes: {
        raw: {
          _source: false,
          aggregations,
          query,
        },
      },
    },
  }
}

const buildRawTagValuesBody = ({ resource, fieldPath, testCase }) => {
  const tagValuePath = `${fieldPath}.tagValue`
  const tagTypePath = `${fieldPath}.tagType`
  const tagKeyPath = `${fieldPath}.key`
  const tagTextPath = `${fieldPath}.tagText`
  const { filters: { tagTypes = undefined, tagValue } = {} } = testCase

  let query

  // Build aggregations

  const keyAggregation = {
    tagKeys: {
      aggs: {
        tagText: {
          terms: {
            field: tagTextPath,
            size: 100,
          },
        },
        tagType: {
          terms: {
            field: tagTypePath,
            size: 100,
          },
        },
        tagValue: {
          terms: {
            field: tagValuePath,
            size: 100,
          },
        },
      },
      terms: {
        field: tagKeyPath,
        size: 100,
      },
    },
  }

  let aggregationFilter = {}

  const bool = {
    must: [],
    should: [],
  }

  if (tagTypes) {
    tagTypes.forEach(tagType => {
      bool.should.push({
        term: {
          [tagTypePath]: tagType,
        },
      })
    })
  }

  if (tagValue) {
    const tagValueFilters = buildTagValueFilter({
      tagValue,
      tagValuePath,
    })
    bool.must = [...bool.must, ...tagValueFilters]
  }

  aggregationFilter = {
    bool,
  }

  if (!Object.keys(aggregationFilter).length) {
    aggregationFilter = {
      match_all: {},
    }
  }
  const aggregations = {
    [resource]: {
      aggs: {
        filter: {
          aggs: keyAggregation,
          filter: aggregationFilter,
        },
      },
      nested: {
        path: fieldPath,
      },
    },
  }

  return {
    data: {
      attributes: {
        raw: {
          _source: false,
          aggregations,
          query,
        },
      },
    },
  }
}

module.exports = function buildRawBody({
  aggregationType,
  resource,
  fieldPath,
  testCase,
}) {
  if (aggregationType === 'tagValues') {
    return buildRawTagValuesBody({
      fieldPath,
      resource,
      testCase,
    })
  }

  if (aggregationType === 'tagTypes') {
    return buildRawTagTypesBody({
      fieldPath,
      resource,
      testCase,
    })
  }

  throw new Error(`Unknown aggregationType: ${aggregationType}`)
}
