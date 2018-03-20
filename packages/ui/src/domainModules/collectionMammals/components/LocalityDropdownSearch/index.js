import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'coreModules/form/components'
import { connect } from 'react-redux'
import {
  CONTINENT,
  COUNTRY,
  DISTRICT,
  PROVINCE,
} from 'domainModules/localityService/constants'
import localitySelectors from 'domainModules/localityService/globalSelectors'
import mammalSelectors from 'domainModules/collectionMammals/globalSelectors'
import updateLocalityInformationSearchQueryAC from 'domainModules/collectionMammals/actionCreators/updateLocalityInformationSearchQuery'

const propTypes = {
  group: PropTypes.oneOf([CONTINENT, COUNTRY, DISTRICT, PROVINCE]).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  updateSearchQuery: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  updateSearchQuery: updateLocalityInformationSearchQueryAC,
}

class LocalityDropdownSearch extends Component {
  render() {
    const { group, input, updateSearchQuery, ...rest } = this.props

    let getDropdownOptions
    switch (group) {
      case CONTINENT: {
        getDropdownOptions = localitySelectors.getDropdownContinentOptions
        break
      }
      case COUNTRY: {
        getDropdownOptions = localitySelectors.getDropdownCountryOptions
        break
      }
      case DISTRICT: {
        getDropdownOptions = localitySelectors.getDropdownDistrictOptions
        break
      }
      case PROVINCE: {
        getDropdownOptions = localitySelectors.getDropdownProvinceOptions
        break
      }
      default: {
        throw new Error(`Unknown group: ${group}`)
      }
    }

    return (
      <Dropdown
        {...rest}
        getOptions={getDropdownOptions}
        getSearchQuery={mammalSelectors.getLocalityInformationSearchQuery}
        input={input}
        onSearchChange={updateSearchQuery}
        type="dropdown-search-connect"
      />
    )
  }
}

LocalityDropdownSearch.propTypes = propTypes

export default connect(null, mapDispatchToProps)(LocalityDropdownSearch)
