import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

const propTypes = {
  disableLevels: PropTypes.array,
  input: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
}

const defaultProps = {
  disableLevels: [],
}

// TODO Move down disable functionality and dry with taxonomy and locality
class StorageLocationLevelDropdown extends Component {
  render() {
    const { disableLevels, input, ...rest } = this.props
    const { value } = input
    let filteredDropdownOptions = dropdownOptions
    if (disableLevels.length) {
      filteredDropdownOptions = dropdownOptions.filter(({ key }) => {
        return !disableLevels.includes(key)
      })
    }

    const valueIsDisabled = disableLevels.includes(value)

    return (
      <DropdownSearch
        {...rest}
        disableClearValue={valueIsDisabled}
        disabled={valueIsDisabled}
        input={input}
        module="storage"
        options={filteredDropdownOptions}
        selectedOption={
          valueIsDisabled
            ? {
                key: value,
                text: capitalizeFirstLetter(value),
                value,
              }
            : undefined
        }
        type="dropdown-search-local"
      />
    )
  }
}

StorageLocationLevelDropdown.propTypes = propTypes
StorageLocationLevelDropdown.defaultProps = defaultProps

export default StorageLocationLevelDropdown
