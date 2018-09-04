const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

const isAcceptedToTaxon = {
  description: 'Find taxon names that are accepted to any taxon',
  inputSchema: {
    type: 'boolean',
  },
  key: 'isAcceptedToTaxon',
  sequelizeFilterFunction: ({ Op, value }) => {
    if (value === undefined) {
      return null
    }
    return {
      acceptedToTaxonId: {
        [Op.not]: null,
      },
    }
  },
}

const filterSpec = createGetManyFilterSpecifications({
  custom: {
    isAcceptedToTaxon,
  },
  include: ['id', 'ids', 'updatedAfter', 'nameSearch'],
})

exports.getMany = filterSpec
exports.query = filterSpec
