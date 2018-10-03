module.exports = function addIncludeDeactivatedQueryParam({ queryParams }) {
  let updatedQueryParams = {
    ...queryParams,
  }

  updatedQueryParams = {
    ...updatedQueryParams,
    includeDeactivated: {
      description: 'Will include deactivated items',
      schema: {
        default: false,
        type: 'boolean',
      },
    },
  }

  return updatedQueryParams
}
