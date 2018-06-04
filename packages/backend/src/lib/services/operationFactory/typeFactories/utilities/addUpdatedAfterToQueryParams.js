module.exports = function addGetByIdsToQueryParams({ queryParams }) {
  const updatedQueryParams = {
    ...queryParams,
    'filter[updatedAfter]': {
      description: 'Filter by updatedAt after specificed timestamp',
      schema: {
        type: 'string',
      },
    },
  }

  return updatedQueryParams
}
