import React, { Component } from 'react'

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

class GeographicLevelDropdown extends Component {
  render() {
    const { ...rest } = this.props
    return (
      <DropdownSearch
        {...rest}
        module="locality"
        options={dropdownOptions}
        type="dropdown-search-local"
      />
    )
  }
}

export default GeographicLevelDropdown
