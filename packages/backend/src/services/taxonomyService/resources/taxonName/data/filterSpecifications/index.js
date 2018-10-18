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

const isVernacularToTaxon = {
  description: 'Find taxon names that are venacular to any taxon',
  inputSchema: {
    type: 'boolean',
  },
  key: 'isVernacularToTaxon',
  sequelizeFilterFunction: ({ Op, value }) => {
    if (value === undefined) {
      return null
    }
    return {
      vernacularToTaxonId: {
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

const taxonNameType = createStringMatchFilter({
  fieldPath: 'taxonNameType',
  key: 'taxonNameType',
})

const filterSpec = createGetManyFilterSpecifications({
  custom: {
    isAcceptedToTaxon,
    isVernacularToTaxon,
    rank,
    rubinNumber,
    taxonNameType,
  },
  include: ['id', 'ids', 'updatedAfter', 'nameSearch'],
})

exports.getMany = filterSpec
exports.query = filterSpec
