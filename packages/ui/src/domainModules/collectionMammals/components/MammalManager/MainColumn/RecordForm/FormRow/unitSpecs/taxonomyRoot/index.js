const model = 'taxonomy'

const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h2',
      textKey: 'headers.taxonomy',
    },
  },
  {
    componentName: 'Remarks',
    componentProps: {
      emptyStateTextKey: 'remarks.emptyState.taxonomy',
      model,
      resultPrefixTextKey: 'remarks.resultPrefix.taxonomy',
    },
    name: 'remarks',
    wrapInField: true,
  },
]

export default {
  name: 'taxonomyRoot',
  parts,
}
