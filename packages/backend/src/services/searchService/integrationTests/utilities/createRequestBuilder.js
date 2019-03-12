module.exports = function createRequestBuilder({
  aggregationFunction,
  filterFunction,
}) {
  const buildBody = ({
    tagTypes = undefined,
    tagValue,
    aggregate = false,
    limit = 100,
    filter = false,
  }) => {
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

  return function buildRequest(options) {
    return {
      body: buildBody(options),
      operationId: 'searchSpecimenQuery',
      validateOutput: false,
    }
  }
}
