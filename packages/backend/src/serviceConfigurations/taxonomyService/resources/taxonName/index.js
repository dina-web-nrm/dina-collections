const migrations = require('./migrations')
const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./transformationSpecifications')

const createTaxonNameRequestSuccess = require('./operations/create/examples/requestSuccess.json')

const {
  getMany: getManyFilterSpecification,
  query: queryFilterSpecification,
} = require('./filterSpecifications')

const {
  acceptedToTaxon: acceptedToTaxonPreHooks,
  synonymToTaxon: synonymToTaxonPreHooks,
} = require('./preHooks')

const {
  create: createPostHooks,
  del: delPostHooks,
  update: updatePostHooks,
  updateTaxonRelationship: updateTaxonRelationshipPostHooks,
} = require('./postHooks')

module.exports = {
  model: {
    migrations,
    name: 'taxonName',
    relations: ['taxon'],
    relationships: {
      acceptedToTaxon: {
        keyAllowNull: true,
        keyName: 'acceptedToTaxonId',
        keyStoredInModel: 'taxonName',
        keyType: 'sql',
        keyUnique: true,
      },
      resourceActivities: {
        inverseRelationshipKey: 'taxonName',
        keyStoredInModel: 'resourceActivity',
        keyType: 'polymorphic',
      },
      synonymToTaxon: {
        keyAllowNull: true,
        keyName: 'synonymToTaxonId',
        keyStoredInModel: 'taxonName',
        keyType: 'sql',
      },
      vernacularToTaxon: {
        keyAllowNull: true,
        keyName: 'vernacularToTaxonId',
        keyStoredInModel: 'taxonName',
        keyType: 'sql',
      },
    },
    type: 'sequelizeDocumentModel',
  },
  operations: [
    {
      exampleRequests: { primary: createTaxonNameRequestSuccess },
      postHooks: createPostHooks,
      type: 'create',
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      filterSpecification: getManyFilterSpecification,
      includeRelations: true,
      sortableFields: ['id', 'attributes.name'],
      type: 'getMany',
    },
    {
      filterSpecification: getManyFilterSpecification,
      type: 'count',
    },
    {
      filterSpecification: queryFilterSpecification,
      selectableFields: ['id', 'attributes.name', 'attributes.rank'],
      sortableFields: ['id', 'attributes.name'],
      type: 'query',
    },
    {
      postHooks: updatePostHooks,
      type: 'update',
    },
    {
      postHooks: delPostHooks,
      type: 'del',
    },
    {
      relationKey: 'acceptedToTaxon',
      type: 'getRelationship',
    },
    {
      transformationSpecification: importDataFromFileTransformationSpecification,
      type: 'importDataFromFile',
    },
    {
      postHooks: updateTaxonRelationshipPostHooks,
      preHooks: acceptedToTaxonPreHooks,
      relationKey: 'acceptedToTaxon',
      type: 'updateRelationship',
    },
    {
      relationKey: 'synonymToTaxon',
      type: 'getRelationship',
    },
    {
      postHooks: updateTaxonRelationshipPostHooks,
      preHooks: synonymToTaxonPreHooks,
      relationKey: 'synonymToTaxon',
      type: 'updateRelationship',
    },
    {
      relationKey: 'vernacularToTaxon',
      type: 'getRelationship',
    },
    {
      postHooks: updateTaxonRelationshipPostHooks,
      relationKey: 'vernacularToTaxon',
      type: 'updateRelationship',
    },
  ],
  resource: 'taxonName',
}
