import React, { Component } from 'react'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import { DropdownSearch } from 'coreModules/form/components'
import { LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4 } from '../../constants'

const levels = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4]

const dropdownOptions = levels.map(level => {
  return {
    key: level,
    text: capitalizeFirstLetter(level),
    value: level,
  }
})

class StorageLocationLevelDropdown extends Component {
  render() {
    const { ...rest } = this.props
    return (
      <DropdownSearch
        {...rest}
        module="storage"
        options={dropdownOptions}
        type="dropdown-search-local"
      />
    )
  }
}

export default StorageLocationLevelDropdown
