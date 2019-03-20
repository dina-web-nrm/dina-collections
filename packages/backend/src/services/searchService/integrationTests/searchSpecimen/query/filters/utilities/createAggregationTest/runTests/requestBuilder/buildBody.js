module.exports = function buildBody({
  aggregationFunction,
  filterFunction,
  testCase,
}) {
  const {
    filters: { tagTypes = undefined, tagValue, input } = {},
    limit = 100,
  } = testCase

  const filter = !!(tagTypes || tagValue || input)

  let aggregations = []
  let query = {}

  aggregations = [
    {
      aggregationFunction,
      input: input || {
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
            input: input || { tagTypes, tagValue },
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
