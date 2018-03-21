import transformDeterminations from './transformDeterminations'

const INITIAL_VALUES = {
  taxonInformation: { determinations: [] },
}

export default function transformTaxonInformation(taxonInformation) {
  if (!taxonInformation) {
    return INITIAL_VALUES.taxonInformation
  }

  const { determinations, taxa } = transformDeterminations(
    taxonInformation.determinations ||
      INITIAL_VALUES.taxonInformation.determinations
  )

  return {
    taxa,
    taxonInformation: {
      ...taxonInformation,
      determinations,
    },
  }
}
