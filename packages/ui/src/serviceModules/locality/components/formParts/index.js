import wrapReduxFormFieldParts from 'coreModules/form/utilities/wrapReduxFormFieldParts'

import GeographicLevelDropdown from '../GeographicLevelDropdown'
import LocalityDropdownPickerSearch from '../LocalityDropdownPickerSearch'
import LocalityDropdownSearch from '../LocalityDropdownSearch'

export default wrapReduxFormFieldParts({
  GeographicLevelDropdown,
  LocalityDropdownPickerSearch,
  LocalityDropdownSearch,
})
