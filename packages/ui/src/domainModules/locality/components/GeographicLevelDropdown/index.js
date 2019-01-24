import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import { DropdownSearch } from 'coreModules/form/components'
import { CONTINENT, COUNTRY, DISTRICT, PLANET, PROVINCE } from '../../constants'

const groups = [CONTINENT, COUNTRY, DISTRICT, PROVINCE, PLANET]

const dropdownOptions = groups.map(group => {
  return {
    key: group,
    text: capitalizeFirstLetter(group),
    value: group,
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

class GeographicLevelDropdown extends Component {
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
        module="locality"
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

GeographicLevelDropdown.propTypes = propTypes
GeographicLevelDropdown.defaultProps = defaultProps

export default GeographicLevelDropdown
