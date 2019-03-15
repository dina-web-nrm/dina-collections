const buildTagValueFilter = require('./buildTagValueFilter')

const buildRawTagTypesBody = ({ resource, tagPath, testCase }) => {
  const tagTypePath = `${tagPath}.tagType.raw`
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
        path: tagPath,
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

const buildRawTagValuesBody = ({ resource, tagPath, testCase }) => {
  const tagValuePath = `${tagPath}.tagValue.raw`
  const tagTypePath = `${tagPath}.tagType.raw`
  const tagKeyPath = `${tagPath}.key.raw`
  const { filters: { tagTypes = undefined, tagValue } = {} } = testCase

  let query

  // Build aggregations

  const keyAggregation = {
    tagKeys: {
      aggs: {
        tagType: {
          terms: {
            field: tagTypePath,
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
        path: tagPath,
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
  tagPath,
  testCase,
}) {
  if (aggregationType === 'tagValues') {
    return buildRawTagValuesBody({
      resource,
      tagPath,
      testCase,
    })
  }

  if (aggregationType === 'tagTypes') {
    return buildRawTagTypesBody({
      resource,
      tagPath,
      testCase,
    })
  }

  throw new Error(`Unknown aggregationType: ${aggregationType}`)
}
