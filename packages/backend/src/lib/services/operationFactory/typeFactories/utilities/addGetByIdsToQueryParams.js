module.exports = function addGetByIdsToQueryParams({ queryParams }) {
  const updatedQueryParams = {
    ...queryParams,
    'filter[ids]': {
      description: 'Filter by ids',
      schema: {
        items: {
          type: 'string',
        },
        type: 'array',
      },
    },
  }

  return updatedQueryParams
}
