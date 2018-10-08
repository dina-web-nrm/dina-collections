const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.determinations',
    },
  },
  {
    componentName: 'DeterminationsAccordion',
    containsReduxFormField: true,
    name: 'individual.determinations',
  },
]

export default {
  name: 'determinations',
  parts,
}
