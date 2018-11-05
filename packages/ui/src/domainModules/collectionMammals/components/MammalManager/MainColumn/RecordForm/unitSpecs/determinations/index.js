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
    relativeNames: [
      'taxonNameV',
      'taxonNameI',
      'determinedByAgent.textV',
      'determinedByAgent.textI',
      'determinedByAgent.normalized.id',
      'date',
      'remarks',
    ],
  },
]

export default {
  name: 'determinations',
  parts,
}
