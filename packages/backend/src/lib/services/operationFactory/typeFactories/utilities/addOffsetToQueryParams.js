module.exports = function addOffsetToQueryParams({ queryParams }) {
  let updatedQueryParams = {
    ...queryParams,
  }

  updatedQueryParams = {
    ...updatedQueryParams,
    offset: {
      description: 'Offset the result',
      schema: {
        minimum: 0,
        type: 'integer',
      },
    },
  }

  return updatedQueryParams
}
