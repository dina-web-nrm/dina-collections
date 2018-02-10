module.exports = {
  method: 'get',
  path: '/taxon/{id}',
  pathParams: ['id'],
  resource: 'taxon',
  response: {
    format: 'object',
  },
  summary: 'Fetches taxon by id',
}
