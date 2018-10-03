const items = [
  {
    as: 'h3',
    componentName: 'TranslatedHeader',
    textKey: 'headers.origin',
  },
  {
    componentName: 'AddButton',
    initiallyShown: true,
    textKey: 'other.addOrigin',
  },
  {
    columnProps: { width: 11 },
    componentName: 'TextArea',
    enableHelpNotifications: false,
    initiallyHidden: true,
    name: 'originInformation.originLocality',
    rows: 2,
    type: 'text',
    wrapInField: true,
  },
  {
    componentName: 'Remarks',
    emptyStateTextKey: 'remarks.emptyState.origin',
    name: 'remarks',
    resultPrefixTextKey: 'remarks.resultPrefix.origin',
    wrapInField: true,
  },
]

export default {
  items,
}
