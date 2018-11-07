const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.contactDetails',
    },
  },
  {
    componentName: 'AddButton',
    componentProps: {
      textKey: 'buttons.contactDetails',
    },
    initiallyShown: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 9 },
      type: 'text',
    },
    initiallyHidden: true,
    name: 'telephone',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 9 },
      type: 'text',
    },
    initiallyHidden: true,
    name: 'email',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 9 },
      type: 'text',
    },
    initiallyHidden: true,
    name: 'streetAddress',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 16 },
      style: { width: '12em' },
      type: 'text',
    },
    initiallyHidden: true,
    name: 'postOfficeBoxNumber',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 9 },
      type: 'text',
    },
    initiallyHidden: true,
    name: 'city',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 7 },
      type: 'text',
    },
    initiallyHidden: true,
    name: 'stateProvince',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 16 },
      style: { width: '12em' },
      type: 'text',
    },
    initiallyHidden: true,
    name: 'postalCode',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 9 },
      type: 'text',
    },
    initiallyHidden: true,
    name: 'country',
    wrapInField: true,
  },
]

export default {
  name: 'agentContactDetails',
  parts,
}
