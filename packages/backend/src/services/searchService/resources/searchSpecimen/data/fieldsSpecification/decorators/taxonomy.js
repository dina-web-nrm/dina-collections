const objectPath = require('object-path')
const fetchParents = require('../../../../../../../lib/data/transformations/utilities/fetchParents')
/* eslint-disable no-param-reassign */

const getTaxonAndParentAcceptedNames = ({ taxonId, getItemByTypeId }) => {
  return getItemByTypeId({
    id: taxonId,
    queryParams: {
      relationships: ['parent', 'acceptedTaxonName'],
    },
    type: 'taxon',
  })
    .then(taxon => {
      if (!taxon) {
        return []
      }

      return fetchParents({
        getItemByTypeId,
        item: taxon,
        relationships: ['parent', 'acceptedTaxonName'],
        resource: 'taxon',
      }).then(parents => {
        return [...parents, taxon]
      })
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
          return taxonTaxonName
        })
      })
      return Promise.all(promises).then(taxonNames => {
        return taxonNames.filter(item => {
          return !!item
        })
      })
    })
}

const transformation = ({ getItemByTypeId, locals, migrator, src }) => {
  const curatorialTaxonId = migrator.getValue({
    obj: src,
    path: 'individual.taxonInformation.curatorialTaxon.id',
  })

  if (curatorialTaxonId === undefined) {
    return null
  }

  return getTaxonAndParentAcceptedNames({
    getItemByTypeId,
    taxonId: curatorialTaxonId,
  }).then(taxonNames => {
    const curatorialTaxonRank = objectPath.get(
      taxonNames,
      `${taxonNames.length - 1}.attributes.rank`
    )

    migrator.setValue({
      obj: locals,
      path: 'curatorialTaxonRank',
      value: curatorialTaxonRank,
    })

    migrator.setValue({
      obj: locals,
      path: 'acceptedTaxonNames',
      value: taxonNames,
    })
    return null
  })
}

module.exports = {
  key: 'decorateTaxonomy',
  transformation,
}
