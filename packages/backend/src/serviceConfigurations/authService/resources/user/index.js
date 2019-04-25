const getUserByIdController = require('./operations/getOne/controller')
const getUsersController = require('./operations/getOne/controller')

const resource = 'user'

module.exports = {
  basePath: '/api/auth/v01',
  operations: [
    {
      controllerFactory: getUserByIdController,
      type: 'getOne',
    },
    {
      controllerFactory: getUsersController,
      type: 'getMany',
    },
  ],
  resource,
}
