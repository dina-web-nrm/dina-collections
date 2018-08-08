module.exports = function addFieldsFromQueryParams({
  queryParams,
  selectableFields = [],
}) {
  if (!selectableFields.length) {
    return queryParams
  }

  return {
    ...queryParams,
    includeFields: {
      description:
        'When provided only specified fields will be returned in response',
      required: false,
      schema: {
        items: {
          enum: selectableFields,
          type: 'string',
        },
        type: 'array',
      },
    },
  }
}
