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

      sequelizeFilterFunction: ({ sequelize, value, Op }) => {
        if (!value) {
          return null
        }

        const regex = RegExp('^[A-Za-z0-9]+$')

        if (!regex.test(value)) {
          throw new Error('Wrong filter format')
        }
        // TODO -> this is sensitive for injections because value is not escaped
        // waiting for fix to: https://github.com/sequelize/sequelize/issues/5173
        const obj = {
          identifierType: {
            id: '1',
          },
          value,
        }

        const query = `"specimen"."document"->'individual'->'identifiers' @> '[${JSON.stringify(
          obj
        )}]'`
        return {
          [Op.and]: [sequelize.literal(query)],
        }
      },
    },
  },
})

exports.getMany = filters
