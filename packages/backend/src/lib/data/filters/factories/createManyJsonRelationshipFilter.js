module.exports = function createManyJsonRelationshipFilter({
  key,
  relationshipKey,
}) {
  return {
    description: `filter by ${relationshipKey} ids`,
    inputSchema: {
      items: {
        type: 'string',
      },
      type: 'array',
    },
    jsFilterFunction: () => {},
    key,
    sequelizeFilterFunction: ({ value, Op }) => {
      if (!Array.isArray(value)) {
        return null
      }

      // TODO -> this is sensitive for injections because value is not escaped
      // waiting for fix to: https://github.com/sequelize/sequelize/issues/5173
      return {
        relationships: {
          [Op.or]: value.map(id => {
            return {
              [Op.contains]: {
                [relationshipKey]: {
                  data: [
                    {
                      id,
                    },
                  ],
                },
              },
            }
          }),
        },
      }
    },
  }
}
