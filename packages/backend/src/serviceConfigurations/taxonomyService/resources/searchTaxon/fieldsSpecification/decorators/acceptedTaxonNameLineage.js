const fetchParents = require('../../../../../../lib/data/transformations/utilities/fetchParents')
/* eslint-disable no-param-reassign */

const getTaxonAndParentAcceptedNames = ({ item, getItemByTypeId }) => {
  return fetchParents({
    getItemByTypeId,
    item,
    relationships: ['parent', 'acceptedTaxonName'],
    resource: 'taxon',
  })
    .then(parents => {
      return [...parents, item]
    })
    .then(taxons => {
      const promises = taxons.map(taxon => {
        const taxonTaxonNameId =
          taxon.relationships &&
          taxon.relationships.acceptedTaxonName &&
          taxon.relationships.acceptedTaxonName.data &&
          taxon.relationships.acceptedTaxonName.data.id
        if (!taxonTaxonNameId) {
          return null
        }

        return getItemByTypeId({
          id: taxonTaxonNameId,
          type: 'taxonName',
        }).then(taxonTaxonName => {
          return {
            ...taxonTaxonName,
            relationships: {
              acceptedToTaxon: {
                data: {
                  id: taxon.id,
                  type: 'taxon',
                },
              },
            },
          }
        })
      })
      return Promise.all(promises).then(taxonNames => {
        return taxonNames.filter(i => {
          return !!i
        })
      })
    })
}

const transformation = ({ getItemByTypeId, locals, migrator, src }) => {
  return getTaxonAndParentAcceptedNames({
    getItemByTypeId,
    item: {
      ...src,
      relationships: src.coreRelationships,
    },
  }).then(acceptedTaxonNameLineage => {
    migrator.setValue({
      obj: locals,
      path: 'acceptedTaxonNameLineage',
      value: acceptedTaxonNameLineage,
    })

    return null
  })
}

module.exports = {
  key: 'decorateTaxonomy',
  transformation,
}
