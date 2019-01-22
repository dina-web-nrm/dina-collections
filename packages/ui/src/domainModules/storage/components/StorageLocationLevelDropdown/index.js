import React, { Component } from 'react'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import { DropdownSearch } from 'coreModules/form/components'
import {
  LEVEL_CABINET,
  LEVEL_INSTITUTION,
  LEVEL_MOUNTING_WALL,
  LEVEL_ROOM,
  LEVEL_SHELF,
} from '../../constants'

const levels = [
  LEVEL_ROOM,
  LEVEL_MOUNTING_WALL,
  LEVEL_CABINET,
  LEVEL_SHELF,
  LEVEL_INSTITUTION,
]

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
