/* eslint-disable no-param-reassign */
const getTaxonNameId = require('./getTaxonNameId')

module.exports = function taxonInformation({
  getItemByTypeId,
  migrator,
  src,
  target,
}) {
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
