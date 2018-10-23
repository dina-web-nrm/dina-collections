import wrapReduxFormFieldParts from 'coreModules/form/utilities/wrapReduxFormFieldParts'

import RankDropdown from '../RankDropdown'
import ScientificNamesTable from '../ScientificNamesTable'
import TaxonDropdownSearch from '../TaxonDropdownSearch'
import TaxonNameDropdownPickerSearch from '../AcceptedTaxonNameDropdownPickerSearch'
import TaxonNameDropdownSearch from '../TaxonNameDropdownSearch'
import TaxonNameTaxonStatus from '../TaxonNameTaxonStatus'
import TogglableAcceptedTaxonNameDropdownPickerSearch from '../TogglableAcceptedTaxonNameDropdownPickerSearch'
import VernacularNamesTable from '../VernacularNamesTable'

export default wrapReduxFormFieldParts({
  RankDropdown,
  ScientificNamesTable,
  TaxonDropdownSearch,
  TaxonNameDropdownPickerSearch,
  TaxonNameDropdownSearch,
  TaxonNameTaxonStatus,
  TogglableAcceptedTaxonNameDropdownPickerSearch,
  VernacularNamesTable,
})
