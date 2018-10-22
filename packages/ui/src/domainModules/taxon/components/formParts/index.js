import wrapReduxFormFieldParts from 'coreModules/form/utilities/wrapReduxFormFieldParts'

import RankDropdown from '../RankDropdown'
import TaxonNameDropdownPickerSearch from '../AcceptedTaxonNameDropdownPickerSearch'
import TaxonNameDropdownSearch from '../TaxonNameDropdownSearch'
import TogglableAcceptedTaxonNameDropdownPickerSearch from '../TogglableAcceptedTaxonNameDropdownPickerSearch'

export default wrapReduxFormFieldParts({
  RankDropdown,
  TaxonNameDropdownPickerSearch,
  TaxonNameDropdownSearch,
  TogglableAcceptedTaxonNameDropdownPickerSearch,
})
