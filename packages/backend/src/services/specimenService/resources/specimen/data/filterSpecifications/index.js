const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

const filters = createGetManyFilterSpecifications({
  custom: {
    catalogNumber: {
      description: 'catalog number used to filter specimens',
      inputSchema: {
        type: 'string',
      },
      jsFilterFunction: () => {},
      key: 'catalogNumber',

      sequelizeFilterFunction: ({ value, Op }) => {
        if (!value) {
          return null
        }
        // TODO The assumption that the catalogNumber is at place 0 amongst identifiers is not resonable
        // waiting for fix to: https://github.com/sequelize/sequelize/issues/5173
        return {
          [Op.and]: [
            {
              'document.individual.identifiers.0.identifierType.id': 1,
              'document.individual.identifiers.0.value': value,
            },
          ],
        }
      },
    },
  },
})

exports.getMany = filters
