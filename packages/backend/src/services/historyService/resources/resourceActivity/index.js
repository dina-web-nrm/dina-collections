const Sequelize = require('sequelize')
const {
  getMany: getManyFilterSpecification,
} = require('./data/filterSpecifications')

module.exports = {
  basePath: '/api/log/v01',
  model: {
    columns: {
      action: { type: Sequelize.STRING },
      requestId: { type: Sequelize.STRING },
      resource: { type: Sequelize.STRING },
      resourceId: { type: Sequelize.STRING },
      service: { type: Sequelize.STRING },
      userId: { type: Sequelize.STRING },
    },
    indexes: [
      {
        fields: ['resource'],
      },
      {
        fields: ['userId'],
      },
      {
        fields: ['resourceId'],
      },
    ],
    modelFactory: 'sequelizeSimpleSqlModel',
    name: 'resourceActivity',
  },
  operations: [
    {
      exampleRequests: {
        primary: {
          data: {
            attributes: {},
            type: 'resourceActivity',
          },
        },
      },
      type: 'create',
    },
    {
      type: 'getOne',
    },
    {
      filterSpecification: getManyFilterSpecification,
      type: 'getMany',
    },
    {
      type: 'update',
    },
    {
      type: 'del',
    },
  ],
  resource: 'resourceActivity',
}
