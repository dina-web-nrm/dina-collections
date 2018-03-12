module.exports = function addRelationsToQueryParams({
  includeRelations,
  queryParams,
  relations,
}) {
  let updatedQueryParams = {
    ...queryParams,
  }
  if (includeRelations) {
    const relationEnum = Object.keys(relations)
    updatedQueryParams = {
      ...updatedQueryParams,
      relationships: {
        description: 'Relationships to add to the response. Add 0 or many',
        example: relationEnum,
        schema: {
          items: {
            enum: ['all', relationEnum],
            type: 'string',
          },
          type: 'array',
        },
      },
    }
  }

  return updatedQueryParams
}
