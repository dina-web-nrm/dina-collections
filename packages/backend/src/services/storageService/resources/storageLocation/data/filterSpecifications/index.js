const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')
const createManyJsonRelationshipFilter = require('../../../../../../lib/data/filters/factories/createManyJsonRelationshipFilter')

const filters = createGetManyFilterSpecifications({
  custom: {
    taxonIds: createManyJsonRelationshipFilter({
      key: 'taxonIds',
      relationshipKey: 'taxa',
    }),
  },
  include: [
    'ancestorsToId',
    'group',
    'id',
    'ids',
    'nameSearch',
    'nodesWithCircularDependencies',
    'parentId',
    'updatedAfter',
  ],
})

exports.getMany = filters
exports.query = filters
