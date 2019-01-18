const parts = [
  {
    componentName: 'TranslatedHeaderWithHelpIcon',
    componentProps: {
      as: 'h3',
      helpNotificationProps: {
        descriptionHeaderKey: 'modules.collectionMammals.headers.identifiers',
        descriptionKey: 'modules.collectionMammals.helpTexts.identifiers',
      },
      textKey: 'headers.identifiers',
    },
    name: 'individual.identifiers',
  },
  {
    componentName: 'IdentifiersTable',
    containsReduxFormField: true,
    name: 'individual.identifiers',
    relativeNames: ['identifierType.id', 'value'],
  },
]

export default {
  name: 'identifiers',
  parts,
}
