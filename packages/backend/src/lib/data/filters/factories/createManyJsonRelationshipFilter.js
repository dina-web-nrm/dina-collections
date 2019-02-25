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
    sequelizeFilterFunction: ({ value, Op, sequelize }) => {
      if (!Array.isArray(value)) {
        return null
      }

      // TODO -> this is sensitive for injections because value is not escaped
      // waiting for fix to: https://github.com/sequelize/sequelize/issues/5173

      return {
        [Op.or]: value.map(id => {
          const regex = RegExp('^[0-9]+$')

          if (!regex.test(id)) {
            throw new Error(`id: ${id} is not allowed in filter`)
          }

          const obj = {
            id,
          }
          const query = `"relationships"->'${relationshipKey}'->'data' @> '[${JSON.stringify(
            obj
          )}]'`
          return sequelize.literal(query)
        }),
      }
    },
  }
}
