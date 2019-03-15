module.exports = function buildBody({
  aggregationFunction,
  filterFunction,
  testCase,
}) {
  const {
    tagTypes = undefined,
    tagValue,
    aggregate = false,
    limit = 100,
    filter = false,
  } = testCase

  let aggregations = []
  let query = {}

  if (aggregate) {
    aggregations = [
      {
        aggregationFunction,
        input: {
          limit,
          tagTypes,
          tagValue,
        },
      },
    ]
  }

  if (filter) {
    query = {
      and: [
        {
          filter: {
            filterFunction,
            input: { tagTypes, tagValue },
          },
        },
      ],
    }
  }

  return {
    data: {
      attributes: {
        aggregations,
        limit,
        query,
      },
    },
  }
}
