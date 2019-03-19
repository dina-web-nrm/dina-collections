module.exports = function buildBody({
  aggregationFunction,
  filterFunction,
  testCase,
}) {
  const {
    filters: { tagTypes = undefined, tagValue } = {},
    limit = 100,
  } = testCase

  const filter = !!(tagTypes || tagValue)

  let aggregations = []
  let query = {}

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
