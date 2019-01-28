const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

const {
  createStringMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../lib/data/filters/factories')

const filters = createGetManyFilterSpecifications({
  custom: {
    fullNameSearch: createStringSearchFilter({
      fieldPath: 'fullName',
      key: 'fullNameSearch',
    }),
    matchAgentType: createStringMatchFilter({
      fieldPath: 'agentType',
      key: 'matchAgentType',
    }),
    matchDisambiguatingDescription: createStringMatchFilter({
      fieldPath: 'disambiguatingDescription',
      key: 'matchDisambiguatingDescription',
      lowerCase: false,
    }),
    matchFullName: createStringMatchFilter({
      fieldPath: 'fullName',
      key: 'matchFullName',
      lowerCase: false,
    }),
  },
  include: ['id', 'ids', 'updatedAfter', 'parentId', 'group', 'name'],
})

exports.getMany = filters
exports.query = filters
