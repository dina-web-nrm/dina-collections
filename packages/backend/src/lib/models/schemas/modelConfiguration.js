module.exports = {
  additionalProperties: false,
  properties: {
    columns: {
      description:
        'Column definition used for the model type: sequelizeSimpleSqlModel',
      type: 'object',
    },
    indexes: {
      description: 'Index definitions for models with postgres as datastore',
      type: 'array',
    },
    mappingSpecification: {
      description:
        'Elasticsearch mappings used for models with elasticsearch as datastore',
      type: 'object',
    },
    migrations: {
      description: 'Migrations for postgres models',
      type: 'object',
    },
    name: {
      description: 'Name of the model used in the datastore',
      type: 'string',
    },
    rebuildStrategy: {
      description: 'Optional for models with elasticsearch as datastore. ',
      enum: ['swap', 'replace'],
      type: 'string',
    },
    relations: {
      type: 'array',
    },

    relationships: {
      patternProperties: {
        '^.*$': {
          additionalProperties: false,
          properties: {
            inverseRelationshipKey: { type: 'string' },
            keyAllowNull: { type: 'boolean' },
            keyName: { type: 'string' },
            keyStoredInModel: { type: 'string' },
            keyType: { enum: ['sql', 'json', 'polymorphic'], type: 'string' },
            keyUnique: { type: 'boolean' },
          },
        },
      },
      type: 'object',
    },
    type: {
      description: 'Model type',
      enum: [
        'sequelizeSimpleSqlModel',
        'sequelizeDocumentModel',
        'elasticsearchDocumentModel',
        'inMemoryDocumentModel',
        'inMemoryViewDocumentModel',
      ],
      type: 'string',
    },
  },
  required: [],
}
