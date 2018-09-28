import extractInitiallyHiddenFields from 'coreModules/form/utilities/extractInitiallyHiddenFields'
import getCatalogCardInformationName from '../../formParts/CatalogCardInformation/getNestedName'

const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.externalEvents',
    },
  },
  {
    componentName: 'RecordHistoryExternalEvents',
    name: 'individual.recordHistoryEvents',
  },
  {
    componentName: 'AddButton',
    componentProps: {
      textKey: 'other.addCatalogCardCreation',
    },
    initiallyShown: true,
  },
  {
    componentName: 'CatalogCardInformation',
    containsReduxFormField: true,
    getNestedName: getCatalogCardInformationName,
    initiallyHidden: true,
    name: 'individual.recordHistoryEvents',
  },
]

export default {
  initiallyHiddenFields: extractInitiallyHiddenFields(parts),
  name: 'recordHistoryExternalEvents',
  parts,
}
