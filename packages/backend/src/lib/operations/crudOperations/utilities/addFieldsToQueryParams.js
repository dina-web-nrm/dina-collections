module.exports = function addFieldsFromQueryParams({
  queryParams,
  selectableFields = [],
}) {
  if (!selectableFields.length) {
    return queryParams
  }

  return {
    ...queryParams,
    excludeFields: {
      description:
        'When provided specified fields will be excluded (applied after include)',
      required: false,
      schema: {
        items: {
          enum: selectableFields,
          type: 'string',
        },
        type: 'array',
      },
    },
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
