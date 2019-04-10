module.exports = function buildBody({
  filterFunction: defaultFilterFunction,
  testCase,
}) {
  const { filters: filtersInput, limit = 100 } = testCase

  const filters = Array.isArray(filtersInput) ? filtersInput : [filtersInput]

  const query = {
    and: filters
      .map(filter => {
        const {
          input,
          tagTypes,
          tagValue,
          filterFunction = defaultFilterFunction,
        } = filter || {}
        if (!(input || tagTypes || tagValue)) {
          return null
        }

        if (input) {
          return {
            filter: {
              filterFunction,
              input: {
                limit,
                ...input,
              },
            },
          }
        }
        return {
          filter: {
            filterFunction,
            input: { limit, tagTypes, tagValue },
          },
        }
      })
      .filter(item => {
        return !!item
      }),
  }

  return {
    data: {
      attributes: {
        limit,
        query,
      },
    },
  }
}
