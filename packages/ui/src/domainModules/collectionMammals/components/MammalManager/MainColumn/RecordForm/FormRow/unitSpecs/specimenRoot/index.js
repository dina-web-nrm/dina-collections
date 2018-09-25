const model = 'specimen'

const items = [
  {
    as: 'h2',
    columnProps: { width: 12 },
    componentName: 'TranslatedHeader',
    textKey: 'headers.basicInformation',
  },
  {
    columnProps: { width: 4 },
    componentName: 'Checkbox',
    inline: true,
    model,
    name: 'publishRecord',
    textKey: 'public',
  },
  {
    componentName: 'Remarks',
    emptyStateTextKey: 'remarks.emptyState.specimen',
    model,
    name: 'remarks',
    resultPrefixTextKey: 'remarks.resultPrefix.specimen',
  },
]

export default {
  items,
}
