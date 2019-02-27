const createForeignKeyMatchFilter = require('../../../../../lib/data/filters/factories/createForeignKeyMatchFilter')
const createStringMatchFilter = require('../../../../../lib/data/filters/factories/createStringMatchFilter')
const createGetManyFilterSpecifications = require('../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

const acceptedToTaxonId = createForeignKeyMatchFilter({
  description: 'Find taxon names that are accepted to taxon id',
  fieldPath: 'acceptedToTaxonId',
  key: 'acceptedToTaxonId',
})

const synonymToTaxonId = createForeignKeyMatchFilter({
  description: 'Find taxon names that are synonym to taxon id',
  fieldPath: 'synonymToTaxonId',
  key: 'synonymToTaxonId',
})

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

const neitherAcceptedNorSynonymToTaxon = {
  description:
    'Find scientific names that are neither accepted nor synonym to any taxon',
  inputSchema: {
    type: 'boolean',
  },
  key: 'neitherAcceptedNorSynonymToTaxon',
  sequelizeFilterFunction: ({ value }) => {
    if (value === undefined) {
      return null
    }

    return {
      acceptedToTaxonId: null,
      'document.taxonNameType': 'scientific',
      synonymToTaxonId: null,
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
    acceptedToTaxonId,
    isAcceptedToTaxon,
    isVernacularToTaxon,
    neitherAcceptedNorSynonymToTaxon,
    rank,
    rubinNumber,
    synonymToTaxonId,
    taxonNameType,
  },
  include: ['id', 'ids', 'updatedAfter', 'nameSearch'],
})

exports.getMany = filterSpec
exports.query = filterSpec
