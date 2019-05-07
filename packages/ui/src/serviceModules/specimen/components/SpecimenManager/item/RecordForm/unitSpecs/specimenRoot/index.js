const model = 'specimen'

const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h2',
      columnProps: { width: 12 },
      textKey: 'headers.basicInformation',
    },
  },
  {
    componentName: 'Checkbox',
    componentProps: {
      columnProps: { width: 4 },
      inline: true,
      model,
      textKey: 'public',
    },
    name: 'publishRecord',
    wrapInField: true,
  },
  {
    componentName: 'Remarks',
    componentProps: {
      emptyStateTextKey: 'remarks.emptyState.specimen',
      model,
      resultPrefixTextKey: 'remarks.resultPrefix.specimen',
    },
    name: 'remarks',
    wrapInField: true,
  },
]

export default {
  name: 'specimenRoot',
  parts,
}
