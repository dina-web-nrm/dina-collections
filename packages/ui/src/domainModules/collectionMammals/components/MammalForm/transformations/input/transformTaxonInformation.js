import transformDeterminations from './transformDeterminations'

const INITIAL_VALUES = {
  taxonInformation: { determinations: [{}] },
}

export default function transformTaxonInformation(taxonInformation) {
  if (!taxonInformation) {
    return INITIAL_VALUES.taxonInformation
  }

  return {
    ...taxonInformation,
    determinations: transformDeterminations(taxonInformation.determinations),
  }
}
