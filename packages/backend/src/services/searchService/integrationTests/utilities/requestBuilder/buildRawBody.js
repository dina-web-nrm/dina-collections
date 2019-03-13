module.exports = function buildRawBody({ resource, tagPath, testCase }) {
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
      bool.must.push({
        wildcard: {
          [tagValuePath]: tagValue,
        },
      })
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

  // Build query
  if (tagTypes) {
    query = {
      bool: {
        must: [],
      },
    }
  }

  if (tagTypes) {
    query.bool.must.push({
      nested: {
        path: tagPath,
        query: {
          bool: {
            should: tagTypes.map(tagType => {
              return {
                wildcard: {
                  [tagTypePath]: tagType,
                },
              }
            }),
          },
        },
      },
    })
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
