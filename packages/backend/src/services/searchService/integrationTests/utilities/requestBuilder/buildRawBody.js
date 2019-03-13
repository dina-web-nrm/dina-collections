const buildTagValueFilter = require('./buildTagValueFilter')

const buildRawTagTypesBody = ({ resource, tagPath, testCase }) => {
  const tagTypePath = `${tagPath}.tagType.raw`
  const { tagTypes = undefined, aggregate = false } = testCase

  let aggregations
  let query

  // Build aggregations

  if (aggregate) {
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

    aggregations = {
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

const buildRawTagValuesBody = ({ resource, tagPath, testCase, useRegexp }) => {
  const tagValuePath = `${tagPath}.tagValue.raw`
  const tagTypePath = `${tagPath}.tagType.raw`
  const tagKeyPath = `${tagPath}.key.raw`
  const { tagTypes = undefined, tagValue, aggregate = false } = testCase

  let aggregations
  let query

  // Build aggregations

  if (aggregate) {
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
      bool.must.push(
        buildTagValueFilter({
          tagValue,
          tagValuePath,
          useRegexp,
        })
      )
    }

    aggregationFilter = {
      bool,
    }

    if (!Object.keys(aggregationFilter).length) {
      aggregationFilter = {
        match_all: {},
      }
    }
    aggregations = {
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
  useRegexp,
}) {
  if (aggregationType === 'tagValues') {
    return buildRawTagValuesBody({
      resource,
      tagPath,
      testCase,
      useRegexp,
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
