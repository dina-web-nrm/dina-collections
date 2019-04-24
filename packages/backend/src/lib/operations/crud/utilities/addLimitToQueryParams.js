module.exports = function addLimitToQueryParams({ queryParams }) {
  let updatedQueryParams = {
    ...queryParams,
  }

  updatedQueryParams = {
    ...updatedQueryParams,
    limit: {
      description: 'Limit the result',
      schema: {
        minimum: 0,
        type: 'integer',
      },
    },
  }

  return updatedQueryParams
}
