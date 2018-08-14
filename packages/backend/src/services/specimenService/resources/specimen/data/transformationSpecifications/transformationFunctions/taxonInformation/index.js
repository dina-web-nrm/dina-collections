/* eslint-disable no-param-reassign */
const getTaxonNameId = require('./getTaxonNameId')

module.exports = function taxonInformation({
  getItemByTypeId,
  migrator,
  src,
  target,
}) {
  const taxonRemarks = migrator.getValue({
    obj: src,
    path: 'objects.TaxonomicRemarks',
    strip: true,
  })

  if (taxonRemarks) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.taxonInformation.taxonRemarks',
      value: taxonRemarks,
    })
  }

  return getTaxonNameId({
    getItemByTypeId,
    migrator,
    src,
  }).then(taxonNameId => {
    if (taxonNameId) {
      migrator.setValue({
        obj: target,
        path: 'attributes.individual.taxonInformation.curatorialTaxonName.id',
        value: taxonNameId,
      })
    }
  })
}
