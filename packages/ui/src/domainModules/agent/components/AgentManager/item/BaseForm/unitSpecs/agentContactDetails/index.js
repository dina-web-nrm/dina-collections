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
      columnProps: { width: 8 },
      fluid: true,
      type: 'text',
    },
    initiallyHidden: true,
    name: 'telephone',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 8 },
      fluid: true,
      type: 'text',
    },
    initiallyHidden: true,
    name: 'email',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 12 },
      fluid: true,
      type: 'text',
    },
    initiallyHidden: true,
    name: 'streetAddress',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 4 },
      fluid: true,
      type: 'text',
    },
    initiallyHidden: true,
    name: 'postOfficeBoxNumber',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 4 },
      fluid: true,
      type: 'text',
    },
    initiallyHidden: true,
    name: 'postalCode',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 6 },
      fluid: true,
      type: 'text',
    },
    initiallyHidden: true,
    name: 'city',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 6 },
      fluid: true,
      type: 'text',
    },
    initiallyHidden: true,
    name: 'stateProvince',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 6 },
      fluid: true,
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
