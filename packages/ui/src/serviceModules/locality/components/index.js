import LocalLocalityManager from './LocalityManager/Local'
import LocalityDropdownPickerSearch, {
  setLocalManager,
} from './LocalityDropdownPickerSearch'
import LocalityDropdownSearch from './LocalityDropdownSearch'
import LocalityManager from './LocalityManager/Query'

setLocalManager(LocalLocalityManager)

export { LocalityDropdownPickerSearch, LocalityDropdownSearch, LocalityManager }
