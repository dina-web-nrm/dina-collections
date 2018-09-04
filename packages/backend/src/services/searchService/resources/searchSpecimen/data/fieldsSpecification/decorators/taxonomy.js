const fetchParents = require('../../../../../../../lib/data/transformations/utilities/fetchParents')
/* eslint-disable no-param-reassign */

const getTaxonNameWithParentTaxonNames = ({ taxonNameId, getItemByTypeId }) => {
  return getItemByTypeId({
    id: taxonNameId,
    queryParams: {
      relationships: ['acceptedToTaxon'],
    },
    type: 'taxonName',
  }).then(taxonName => {
    const taxonId =
      taxonName.relationships &&
      taxonName.relationships.acceptedToTaxon &&
      taxonName.relationships.acceptedToTaxon.data &&
      taxonName.relationships.acceptedToTaxon.data.id

    if (!taxonId) {
      return [taxonName]
    }

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
  })
}

const transformation = ({ getItemByTypeId, locals, migrator, src }) => {
  const curatorialTaxonNameId = migrator.getValue({
    obj: src,
    path: 'individual.taxonInformation.curatorialTaxonName.id',
  })

  if (curatorialTaxonNameId === undefined) {
    return null
  }

  return getTaxonNameWithParentTaxonNames({
    getItemByTypeId,
    taxonNameId: curatorialTaxonNameId,
  }).then(taxonNames => {
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
