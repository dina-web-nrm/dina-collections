const Sequelize = require('sequelize')
const fieldsSpecification = require('./data/fieldsSpecification')
const extractSortableFields = require('../../../../lib/data/fields/utilities/extractSortableFields')
const extractSelectableFields = require('../../../../lib/data/fields/utilities/extractSelectableFields')

const {
  getMany: getManyFilterSpecification,
} = require('./data/filterSpecifications')

const {
  generateCatalogNumber: generateCatalogNumberOperationFactory,
} = require('./data/operationFactories')

const {
  updateView: updateViewTransformationSpecification,
  rebuildView: rebuildViewTransformationSpecification,
} = require('./data/transformationSpecifications')

const {
  create: createPreHooks,
  validate: validatePreHooks,
} = require('./data/preHooks')

const sortableFields = extractSortableFields({ fieldsSpecification })
const selectableFields = extractSelectableFields({ fieldsSpecification })

module.exports = {
  basePath: '/api/identifiers/v01',
  model: {
    columns: {
      identifier: { type: Sequelize.STRING, unique: true },
      number: { type: Sequelize.INTEGER },
      year: { type: Sequelize.INTEGER },
    },
    indexes: [
      {
        fields: ['identifier', 'year', 'number'],
      },
    ],
    modelFactory: 'sequelizeSimpleSqlModel',
    name: 'catalogNumber',
  },
  operations: [
    {
      factory: generateCatalogNumberOperationFactory,
    },
    {
      exampleRequests: {
        primary: {
          data: {
            attributes: {
              identifier: '123432',
            },
            type: 'catalogNumber',
          },
        },
      },
      preHooks: createPreHooks,
      type: 'create',
    },
    {
      type: 'del',
    },
    {
      selectableFields,
      type: 'getOne',
    },
    {
      preHooks: validatePreHooks,
      type: 'validate',
    },
    {
      filterSpecification: getManyFilterSpecification,
      selectableFields,
      sortableFields,
      type: 'getMany',
    },
    {
      transformationSpecification: updateViewTransformationSpecification,
      type: 'updateView',
    },
    {
      transformationSpecification: rebuildViewTransformationSpecification,
      type: 'rebuildView',
    },
  ],
  resource: 'catalogNumber',
}
