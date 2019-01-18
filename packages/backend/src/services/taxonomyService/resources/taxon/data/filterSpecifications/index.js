const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

const nameSearch = {
  description: `Search taxon by acceptedName`,
  inputSchema: {
    type: 'string',
  },
  key: 'nameSearch',
  sequelizeFilterFunction: ({ Op, value, serviceInteractor }) => {
    if (value === undefined) {
      return null
    }
    return serviceInteractor
      .getMany({
        request: {
          queryParams: {
            filter: {
              isAcceptedToTaxon: true,
              nameSearch: value,
            },
            limit: 10000,
            relationships: ['acceptedToTaxon'],
          },
        },
        resource: 'taxonName',
      })
      .then(({ data = [] }) => {
        const ids = data.map(taxonName => {
          return (
            taxonName.relationships &&
            taxonName.relationships.acceptedToTaxon &&
            taxonName.relationships.acceptedToTaxon.data &&
            taxonName.relationships.acceptedToTaxon.data.id
          )
        })

        return {
          id: {
            [Op.in]: ids,
          },
        }
      })
  },
}

const vernacularNameSearch = {
  description: `Search taxon by vernacular name`,
  inputSchema: {
    type: 'string',
  },
  key: 'vernacularNameSearch',
  sequelizeFilterFunction: ({ Op, value, serviceInteractor }) => {
    if (value === undefined) {
      return null
    }
    return serviceInteractor
      .getMany({
        request: {
          queryParams: {
            filter: {
              isVernacularToTaxon: true,
              nameSearch: value,
            },
            limit: 10000,
            relationships: ['vernacularToTaxon'],
          },
        },
        resource: 'taxonName',
      })
      .then(({ data = [] }) => {
        const ids = data.map(taxonName => {
          return (
            taxonName.relationships &&
            taxonName.relationships.vernacularToTaxon &&
            taxonName.relationships.vernacularToTaxon.data &&
            taxonName.relationships.vernacularToTaxon.data.id
          )
        })

        return {
          id: {
            [Op.in]: ids,
          },
        }
      })
  },
}

const nameRank = {
  description: `Search taxon by accepted name rank`,
  inputSchema: {
    type: 'string',
  },
  key: 'nameRank',
  sequelizeFilterFunction: ({ Op, value, serviceInteractor }) => {
    if (value === undefined) {
      return null
    }
    return serviceInteractor
      .getMany({
        request: {
          queryParams: {
            filter: {
              isAcceptedToTaxon: true,
              rank: value,
            },
            limit: 10000,
            relationships: ['acceptedToTaxon'],
          },
        },
        resource: 'taxonName',
      })
      .then(({ data = [] }) => {
        const ids = data.map(taxonName => {
          return (
            taxonName.relationships &&
            taxonName.relationships.acceptedToTaxon &&
            taxonName.relationships.acceptedToTaxon.data &&
            taxonName.relationships.acceptedToTaxon.data.id
          )
        })

        return {
          id: {
            [Op.in]: ids,
          },
        }
      })
  },
}

exports.getMany = createGetManyFilterSpecifications({
  custom: {
    nameRank,
    nameSearch,
    vernacularNameSearch,
  },
  include: [
    'ancestorsToId',
    'excludeRootNode',
    'group',
    'id',
    'ids',
    'name',
    'nodesWithCircularDependencies',
    'parentId',
    'updatedAfter',
  ],
})

exports.query = createGetManyFilterSpecifications({
  custom: {
    nameRank,
    nameSearch,
    vernacularNameSearch,
  },
  include: [
    'excludeRootNode',
    'group',
    'id',
    'ids',
    'name',
    'parentId',
    'updatedAfter',
  ],
})
