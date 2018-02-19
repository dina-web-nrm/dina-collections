module.exports = {
  method: 'get',
  path: '/specimensApi/v01/specimens/{id}/versions',
  pathParams: ['id'],
  queryParams: {
    include: {
      description: 'sub models to include in a comma separated string',
      example:
        'identifiableUnits.physicalUnits.storageLoaction,curratedLocalities',
      required: false,
      schema: {
        type: 'string',
      },
    },
  },

  resource: 'specimen',
  response: {
    format: 'array',
  },
  summary: 'Find specimen versions by id',
}
