module.exports = function addFieldsFromQueryParams({
  queryParams,
  fieldsSpecification = {},
}) {
  const fields = fieldsSpecification.fields || []

  if (!fields.length) {
    return queryParams
  }

  return {
    ...queryParams,
    fields: {
      description:
        'When provided only specified fields will be returned in response',
      required: false,
      schema: {
        items: {
          enum: fields,
          type: 'string',
        },
        type: 'array',
      },
    },
  }
}
