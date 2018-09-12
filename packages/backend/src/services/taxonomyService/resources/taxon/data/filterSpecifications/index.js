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
            limit: 1000,
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
    nameSearch,
  },
  include: [
    'ancestorsToId',
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
    nameSearch,
  },
  include: ['id', 'ids', 'updatedAfter', 'parentId', 'group', 'name'],
})
