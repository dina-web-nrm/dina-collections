const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.origin',
    },
  },
  {
    componentName: 'AddButton',
    componentProps: {
      textKey: 'other.addOrigin',
    },
    initiallyShown: true,
  },
  {
    componentName: 'TextArea',
    componentProps: {
      columnProps: { width: 11 },
      enableHelpNotifications: false,
      rows: 2,
      type: 'text',
    },
    initiallyHidden: true,
    name: 'originInformation.originLocality',
    wrapInField: true,
  },
  {
    componentName: 'Remarks',
    componentProps: {
      emptyStateTextKey: 'remarks.emptyState.origin',
      resultPrefixTextKey: 'remarks.resultPrefix.origin',
    },
    name: 'remarks',
    wrapInField: true,
  },
]

export default {
  name: 'origin',
  parts,
}
