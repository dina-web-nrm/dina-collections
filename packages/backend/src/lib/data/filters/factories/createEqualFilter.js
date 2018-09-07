module.exports = function createEqualFilter({
  filterParameter,
  filterSchema = {
    type: 'string',
  },
  fieldPath,
  isBoolean = false,
}) {
  return {
    description: `Filter by ${
      filterParameter
    }. Provide true to check existance. null to check no existance`,
    inputSchema: filterSchema,
    jsFilterFunction: () => {},
    key: filterParameter,

    sequelizeFilterFunction: ({ Op, value }) => {
      if (value === undefined) {
        return null
      }

      if (value === 'true' || value === true) {
        if (isBoolean) {
          return {
            [Op.and]: [
              {
                [fieldPath]: {
                  [Op.not]: false,
                },
              },
              {
                [fieldPath]: {
                  [Op.ne]: null,
                },
              },
            ],
          }
        }
        return {
          [fieldPath]: {
            [Op.ne]: null,
          },
        }
      }

      if (value === 'null') {
        return {
          [fieldPath]: {
            [Op.eq]: null,
          },
        }
      }

      return {
        [fieldPath]: value,
      }
    },
  }
}
