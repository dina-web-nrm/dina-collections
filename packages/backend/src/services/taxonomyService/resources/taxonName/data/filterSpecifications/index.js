const createStringMatchFilter = require('../../../../../../lib/data/filters/factories/createStringMatchFilter')
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

const rank = createStringMatchFilter({
  fieldPath: 'rank',
  key: 'rank',
})

const rubinNumber = createStringMatchFilter({
  fieldPath: 'rubinNumber',
  key: 'rubinNumber',
})

const filterSpec = createGetManyFilterSpecifications({
  custom: {
    isAcceptedToTaxon,
    rank,
    rubinNumber,
  },
  include: ['id', 'ids', 'updatedAfter', 'nameSearch'],
})

exports.getMany = filterSpec
exports.query = filterSpec
