module.exports = {
  method: 'get',
  path: '/specimensApi/v01/specimens/{id}/versions/{versionId}',
  pathParams: ['id', 'versionId'],
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
    format: 'object',
  },
  summary: 'Find an specimen version by id and versionId',
}
