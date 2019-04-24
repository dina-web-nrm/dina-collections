module.exports = function addMockToQueryParams({ queryParams }) {
  let updatedQueryParams = {
    ...queryParams,
  }

  updatedQueryParams = {
    ...updatedQueryParams,
    mock: {
      description: 'Will return mock data',
      schema: {
        default: false,
        type: 'boolean',
      },
    },
  }

  return updatedQueryParams
}
