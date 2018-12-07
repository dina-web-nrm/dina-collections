import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import { DropdownSearch } from 'coreModules/form/components'
import {
  CLASS,
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

const propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
}

class RankDropdown extends Component {
  render() {
    const { input: { value } } = this.props

    // allow value 'class' to be shown, but disabled and not selectable
    return (
      <DropdownSearch
        {...this.props}
        disableClearValue={value === CLASS}
        disabled={value === CLASS}
        module="taxon"
        options={dropdownOptions}
        resource="taxonName"
        selectedOption={
          value === CLASS
            ? {
                key: CLASS,
                text: capitalizeFirstLetter(CLASS),
                value: CLASS,
              }
            : undefined
        }
        type="dropdown-search-local"
      />
    )
  }
}

RankDropdown.propTypes = propTypes

export default RankDropdown
