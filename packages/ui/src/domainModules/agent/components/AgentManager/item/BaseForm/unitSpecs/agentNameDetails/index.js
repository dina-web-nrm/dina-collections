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
      type: 'text',
    },
    initiallyHidden: true,
    name: 'familyName',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      type: 'text',
    },
    initiallyHidden: true,
    name: 'additionalName',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      type: 'text',
    },
    initiallyHidden: true,
    name: 'alsoKnownAs',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { clear: true, width: 6 },
      type: 'text',
    },
    initiallyHidden: true,
    name: 'title',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { clear: true, width: 4 },
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
