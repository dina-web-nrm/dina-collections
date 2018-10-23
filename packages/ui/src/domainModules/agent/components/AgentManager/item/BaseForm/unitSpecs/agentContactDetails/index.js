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
      fluid: true,
      type: 'text',
    },
    initiallyHidden: true,
    name: 'email',
    wrapInField: true,
  },
  {
    componentName: 'TextArea',
    componentProps: {
      fluid: true,
    },
    initiallyHidden: true,
    name: 'postalAddress',
    wrapInField: true,
  },
]

export default {
  name: 'agentContactDetails',
  parts,
}
