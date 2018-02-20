module.exports = function getAllByTaxonNameFactory({ coreMethods }) {
  return function getAllByTaxonName({ taxonName } = {}) {
    if (!taxonName) {
      return Promise.reject(new Error('taxonName not provided'))
    }

    return coreMethods.getWhere({
      where: {
        'document.identifications.0.identifiedTaxonNameStandardized': taxonName,
      },
    })
  }
}
