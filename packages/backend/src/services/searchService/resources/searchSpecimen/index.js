const resource = 'searchSpecimen'

module.exports = {
  basePath: '/api/specimen/v01',
  operations: [
    {
      type: 'getOne',
    },
    {
      type: 'getMany',
    },
  ],
  resource,
}
