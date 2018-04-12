import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import config from 'config'
import { DropdownSearch } from 'coreModules/form/components'
import { ensureAllPlacesFetched } from 'dataModules/placeService/higherOrderComponents'
import { ALL, CONTINENT, COUNTRY, DISTRICT, PROVINCE } from '../../constants'
import { actionCreators, globalSelectors } from '../../keyObjectModule'
import localitySelectors from '../../globalSelectors'

const propTypes = {
  allPlacesFetched: PropTypes.bool.isRequired,
  group: PropTypes.oneOf([ALL, CONTINENT, COUNTRY, DISTRICT, PROVINCE])
    .isRequired,
  updateSearchQuery: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  updateSearchQuery:
    actionCreators.set['localityDropdown.:identifier.searchQuery'],
}

class LocalityDropdownSearch extends Component {
  render() {
    const { allPlacesFetched, group, updateSearchQuery, ...rest } = this.props

    if (!allPlacesFetched && !config.isTest) {
      return null
    }

    let getDropdownOptions
    switch (group) {
      case ALL: {
        getDropdownOptions = localitySelectors.getDropdownAllOptions
        break
      }
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
      <DropdownSearch
        {...rest}
        getOptions={getDropdownOptions}
        getSearchQuery={state => {
          return globalSelectors.get[
            'localityDropdown.:identifier.searchQuery'
          ](state, { identifier: group })
        }}
        getSelectedOption={localitySelectors.getPlaceOption}
        onSearchChange={({ searchQuery }) => {
          updateSearchQuery(searchQuery, { identifier: group })
        }}
        type="dropdown-search-connect"
      />
    )
  }
}

LocalityDropdownSearch.propTypes = propTypes

export default compose(
  ensureAllPlacesFetched(),
  connect(null, mapDispatchToProps)
)(LocalityDropdownSearch)
