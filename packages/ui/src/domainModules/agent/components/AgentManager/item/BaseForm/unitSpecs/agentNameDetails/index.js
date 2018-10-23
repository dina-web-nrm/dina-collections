const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.nameDetails',
    },
  },
  {
    componentName: 'AddButton',
    componentProps: {
      textKey: 'buttons.nameDetails',
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
    name: 'givenName',
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
    name: 'familyName',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      fluid: true,
      type: 'text',
    },
    initiallyHidden: true,
    name: 'additionalName',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      fluid: true,
      type: 'text',
    },
    initiallyHidden: true,
    name: 'alsoKnownAs',
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
    name: 'abbreviation',
    wrapInField: true,
  },
]

export default {
  name: 'agentNameDetails',
  parts,
}
