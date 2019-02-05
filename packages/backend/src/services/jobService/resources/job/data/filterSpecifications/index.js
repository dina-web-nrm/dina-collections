const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

const {
  createEqualFilter,
  createStringInFilter,
  createStringNotInFilter,
} = require('../../../../../../lib/data/filters/factories')

const equalFilterParameters = [
  'deactivatedAt',
  'failedAt',
  'startedAt',
  'succeededAt',
]

const filters = createGetManyFilterSpecifications({
  custom: equalFilterParameters.reduce(
    (obj, filterParameter) => {
      const filter = createEqualFilter(
        {
          fieldPath: filterParameter,
          filterParameter,
        },
        {}
      )
      return {
        ...obj,
        [filterParameter]: filter,
      }
    },
    {
      excludeGroups: createStringNotInFilter({
        fieldPath: 'group',
        key: 'excludeGroups',
      }),
      includeGroups: createStringInFilter({
        fieldPath: 'group',
        key: 'includeGroups',
      }),
    }
  ),
})

exports.getMany = filters
exports.query = filters
