import wrapReduxFormFieldParts from 'coreModules/form/utilities/wrapReduxFormFieldParts'

import TaxonNameDropdownPickerSearch from '../AcceptedTaxonNameDropdownPickerSearch'
import TaxonNameDropdownSearch from '../TaxonNameDropdownSearch'
import TogglableAcceptedTaxonNameDropdownPickerSearch from '../TogglableAcceptedTaxonNameDropdownPickerSearch'

export default wrapReduxFormFieldParts({
  TaxonNameDropdownPickerSearch,
  TaxonNameDropdownSearch,
  TogglableAcceptedTaxonNameDropdownPickerSearch,
})
