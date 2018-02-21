module.exports = function getAllByTaxonNameFactory({ coreMethods }) {
  return function getAllByTaxonName({ taxonName } = {}) {
    if (!taxonName) {
      return Promise.reject(new Error('taxonName not provided'))
    }

    return coreMethods.getWhere({
      where: {
        'document.individualGroup.assignedTaxon.determinations.0.taxonNameStandardized': taxonName,
      },
    })
  }
}
