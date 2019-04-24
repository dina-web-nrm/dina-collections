const resource = 'user'

module.exports = {
  basePath: '/api/auth/v01',
  operations: [
    {
      controller: 'getUserById',
      type: 'getOne',
    },
    {
      controller: 'getUsers',
      type: 'getMany',
    },
  ],
  resource,
}
