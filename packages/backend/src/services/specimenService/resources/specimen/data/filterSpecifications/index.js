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

        return {
          identifiers: {
            [Op.contains]: [
              {
                identifierType: { id: '1' },
                value,
              },
            ],
          },
        }
      },
    },
  },
})

exports.getMany = filters
