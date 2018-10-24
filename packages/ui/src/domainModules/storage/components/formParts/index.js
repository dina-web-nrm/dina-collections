import wrapReduxFormFieldParts from 'coreModules/form/utilities/wrapReduxFormFieldParts'

import PreparationTypesTable from './PreparationTypesTable'
import StorageLocationDropdownSearch from '../StorageLocationDropdownSearch'
import StorageLocationLevelDropdown from '../StorageLocationLevelDropdown'
import TaxaTable from './TaxaTable'

export default {
  ...wrapReduxFormFieldParts({
    PreparationTypesTable,
    StorageLocationDropdownSearch,
    StorageLocationLevelDropdown,
    TaxaTable,
  }),
}
