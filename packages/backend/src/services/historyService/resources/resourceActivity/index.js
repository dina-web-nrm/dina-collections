const Sequelize = require('sequelize')
const {
  getMany: getManyFilterSpecification,
} = require('./data/filterSpecifications')

const selectableFields = [
  'id',
  'attributes.action',
  'attributes.diff',
  'attributes.requestId',
  'attributes.resource',
  'attributes.resourceId',
  'attributes.service',
  'attributes.snapshot',
  'attributes.srcCreatedAt',
  'attributes.srcDeactivatedAt',
  'attributes.srcUpdatedAt',
  'attributes.userId',
  'attributes.userName',
]

const defaultFields = [
  'id',
  'attributes.action',
  'attributes.resource',
  'attributes.resourceId',
  'attributes.service',
  'attributes.srcCreatedAt',
  'attributes.srcDeactivatedAt',
  'attributes.srcUpdatedAt',
  'attributes.userId',
  'attributes.userName',
]

module.exports = {
  basePath: '/api/log/v01',
  model: {
    columns: {
      action: { type: Sequelize.STRING },
      diff: { type: Sequelize.JSONB },
      requestId: { type: Sequelize.STRING },
      resource: { type: Sequelize.STRING },
      resourceId: { type: Sequelize.STRING },
      service: { type: Sequelize.STRING },
      snapshot: { type: Sequelize.JSONB },
      srcCreatedAt: { type: Sequelize.DATE },
      srcDeactivatedAt: { type: Sequelize.DATE },
      srcUpdatedAt: { type: Sequelize.DATE },
      userId: { type: Sequelize.STRING },
      userName: { type: Sequelize.STRING },
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
      exampleRequests: {
        primary: {
          data: [
            {
              attributes: {},
              type: 'resourceActivity',
            },
          ],
        },
      },
      type: 'bulkCreate',
    },

    {
      defaultFields,
      filterSpecification: getManyFilterSpecification,
      selectableFields,
      type: 'getOne',
    },
    {
      defaultFields,
      filterSpecification: getManyFilterSpecification,
      selectableFields,
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
