import wrapReduxFormFieldParts from 'coreModules/form/utilities/wrapReduxFormFieldParts'

import PreparationTypesTable from './PreparationTypesTable'
import StorageLocationDropdownPickerSearch from '../StorageLocationDropdownPickerSearch'
import StorageLocationDropdownSearch from '../StorageLocationDropdownSearch'
import StorageLocationLevelDropdown from '../StorageLocationLevelDropdown'
import TaxaTable from './TaxaTable'

export default {
  ...wrapReduxFormFieldParts({
    PreparationTypesTable,
    StorageLocationDropdownPickerSearch,
    StorageLocationDropdownSearch,
    StorageLocationLevelDropdown,
    TaxaTable,
  }),
}
