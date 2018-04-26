const INITIAL_VALUES = {
  taxonInformation: {},
}

module.exports = function transformTaxonInformation(taxonInformation) {
  if (!taxonInformation) {
    return INITIAL_VALUES.taxonInformation
  }

  return taxonInformation
}
