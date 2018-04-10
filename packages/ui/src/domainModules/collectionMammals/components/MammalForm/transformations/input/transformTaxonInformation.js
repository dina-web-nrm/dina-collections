const INITIAL_VALUES = {
  taxonInformation: {},
}

export default function transformTaxonInformation(taxonInformation) {
  if (!taxonInformation) {
    return INITIAL_VALUES.taxonInformation
  }

  return taxonInformation
}
