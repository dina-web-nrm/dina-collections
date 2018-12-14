import LocalTaxonNameManager from './TaxonNameManager/Local'
import LocalTaxonManager from './TaxonManager/Local'

import AcceptedTaxonNameDropdownPickerSearch, {
  setLocalManager as setAcceptedTaxonLocalityManager,
} from './AcceptedTaxonNameDropdownPickerSearch'

import RankDropdown from './RankDropdown'
import TaxonDropdownPickerSearch, {
  setLocalManager as setTaxonLocalityManager,
} from './TaxonDropdownPickerSearch'
import TaxonDropdownSearch from './TaxonDropdownSearch'
import TaxonManager from './TaxonManager/Query'
import TaxonNameDropdownPickerSearch, {
  setLocalManager as setTaxonNameLocalityManager,
} from './TaxonNameDropdownPickerSearch'
import TaxonNameDropdownSearch from './TaxonNameDropdownSearch'
import TaxonNameManager from './TaxonNameManager/Query'
import TaxonNameTaxonStatus from './TaxonNameTaxonStatus'
import TogglableTaxonDropdownPickerSearch from './TogglableTaxonDropdownPickerSearch'

setAcceptedTaxonLocalityManager(LocalTaxonManager)
setTaxonLocalityManager(LocalTaxonManager)
setTaxonNameLocalityManager(LocalTaxonNameManager)

export {
  AcceptedTaxonNameDropdownPickerSearch,
  RankDropdown,
  TaxonDropdownPickerSearch,
  TaxonDropdownSearch,
  TaxonManager,
  TaxonNameDropdownPickerSearch,
  TaxonNameDropdownSearch,
  TaxonNameManager,
  TaxonNameTaxonStatus,
  TogglableTaxonDropdownPickerSearch,
}
