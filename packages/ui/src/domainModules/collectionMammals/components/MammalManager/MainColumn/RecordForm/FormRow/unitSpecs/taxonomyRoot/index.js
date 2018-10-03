const model = 'taxonmy'

const items = [
  {
    as: 'h2',
    columnProps: { width: 12 },
    componentName: 'TranslatedHeader',
    textKey: 'headers.taxonomy',
  },
  {
    componentName: 'Remarks',
    emptyStateTextKey: 'remarks.emptyState.taxonomy',
    model,
    name: 'remarks',
    resultPrefixTextKey: 'remarks.resultPrefix.taxonomy',
    wrapInField: true,
  },
]

export default {
  items,
}
