import extractInitiallyHiddenFields from 'coreModules/form/utilities/extractInitiallyHiddenFields'
import getCatalogCardInformationName from '../../formParts/CatalogCardInformation/getNestedName'

const items = [
  {
    as: 'h3',
    componentName: 'TranslatedHeader',
    textKey: 'headers.externalEvents',
  },
  {
    componentName: 'RecordHistoryExternalEvents',
    name: 'individual.recordHistoryEvents',
  },
  {
    componentName: 'AddButton',
    initiallyShown: true,
    textKey: 'other.addCatalogCardCreation',
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
  initiallyHiddenFields: extractInitiallyHiddenFields(items),
  items,
}
