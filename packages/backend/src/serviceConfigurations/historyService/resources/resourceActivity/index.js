const migrations = require('./migrations')
const Sequelize = require('sequelize')
const {
  getMany: getManyFilterSpecification,
} = require('./filterSpecifications')

const selectableFields = [
  'id',
  'attributes.action',
  'attributes.diff',
  'attributes.hasSourceData',
  'attributes.requestId',
  'attributes.resource',
  'attributes.resourceId',
  'attributes.service',
  'attributes.snapshot',
  'attributes.sourceData',
  'attributes.srcCreatedAt',
  'attributes.srcDeactivatedAt',
  'attributes.srcUpdatedAt',
  'attributes.userId',
  'attributes.username',
]

const defaultFields = [
  'id',
  'attributes.action',
  'attributes.hasSourceData',
  'attributes.resource',
  'attributes.resourceId',
  'attributes.service',
  'attributes.srcCreatedAt',
  'attributes.srcDeactivatedAt',
  'attributes.srcUpdatedAt',
  'attributes.userId',
  'attributes.username',
]

module.exports = {
  model: {
    columns: {
      action: { type: Sequelize.STRING },
      diff: { type: Sequelize.JSONB },
      hasSourceData: { type: Sequelize.BOOLEAN },
      requestId: { type: Sequelize.STRING },
      resource: { type: Sequelize.STRING },
      resourceId: { type: Sequelize.STRING },
      service: { type: Sequelize.STRING },
      snapshot: { type: Sequelize.JSONB },
      sourceData: { type: Sequelize.JSONB },
      srcCreatedAt: { type: Sequelize.DATE },
      srcDeactivatedAt: { type: Sequelize.DATE },
      srcSchemaVersion: { type: Sequelize.STRING },
      srcUpdatedAt: { type: Sequelize.DATE },
      userId: { type: Sequelize.STRING },
      username: { type: Sequelize.STRING },
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
    migrations,
    name: 'resourceActivity',
    relationships: {
      normalizedAgent: {
        keyName: 'resourceId',
        keyStoredInModel: 'resourceActivity',
        keyType: 'polymorphic',
      },
      physicalObject: {
        keyName: 'resourceId',
        keyStoredInModel: 'resourceActivity',
        keyType: 'polymorphic',
      },
      place: {
        keyName: 'resourceId',
        keyStoredInModel: 'resourceActivity',
        keyType: 'polymorphic',
      },
      specimen: {
        keyName: 'resourceId',
        keyStoredInModel: 'resourceActivity',
        keyType: 'polymorphic',
      },
      storageLocation: {
        keyName: 'resourceId',
        keyStoredInModel: 'resourceActivity',
        keyType: 'polymorphic',
      },
      taxon: {
        keyName: 'resourceId',
        keyStoredInModel: 'resourceActivity',
        keyType: 'polymorphic',
      },
      taxonName: {
        keyName: 'resourceId',
        keyStoredInModel: 'resourceActivity',
        keyType: 'polymorphic',
      },
    },
    type: 'sequelizeSimpleSqlModel',
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
  resourcePath: 'resourceActivities',
}
