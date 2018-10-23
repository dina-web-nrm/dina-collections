import React, { Component } from 'react'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import { DropdownSearch } from 'coreModules/form/components'
import {
  FAMILY,
  GENUS,
  MISSING_RANK,
  ORDER,
  SPECIES,
  SUBSPECIES,
} from '../../constants'

const ranks = [ORDER, FAMILY, GENUS, SPECIES, SUBSPECIES, MISSING_RANK]

const dropdownOptions = ranks.map(rank => {
  return {
    key: rank,
    text: capitalizeFirstLetter(rank),
    value: rank,
  }
})

class RankDropdown extends Component {
  render() {
    const { ...rest } = this.props
    return (
      <DropdownSearch
        {...rest}
        module="taxon"
        options={dropdownOptions}
        resource="taxonName"
        type="dropdown-search-local"
      />
    )
  }
}

export default RankDropdown
