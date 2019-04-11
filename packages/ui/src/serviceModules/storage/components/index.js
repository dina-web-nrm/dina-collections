import LocalStorageLocationManager from './StorageLocationManager/Local'
import StorageLocationDropdownPickerSearch, {
  setLocalStorageLocationManager,
} from './StorageLocationDropdownPickerSearch'
import StorageLocationDropdownSearch from './StorageLocationDropdownSearch'
import StorageLocationManager from './StorageLocationManager/Query'

setLocalStorageLocationManager(LocalStorageLocationManager)

export {
  StorageLocationDropdownPickerSearch,
  StorageLocationDropdownSearch,
  StorageLocationManager,
}
