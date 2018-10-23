const parts = [
  {
    componentName: 'Input',
    componentProps: {
      fluid: true,
      type: 'text',
    },
    name: 'fullName',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      fluid: true,
      type: 'text',
    },
    name: 'disambiguatingDescription',
    wrapInField: true,
  },
  {
    componentName: 'Remarks',
    componentProps: {
      emptyStateTextKey: 'remarks.emptyState.agent',
    },
    initiallyHidden: true,
    name: 'remarks',
    wrapInField: true,
  },
]

export default {
  name: 'place',
  parts,
}
