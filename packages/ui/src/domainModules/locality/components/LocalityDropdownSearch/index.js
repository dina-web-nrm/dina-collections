import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import config from 'config'
import { DropdownSearch } from 'coreModules/form/components'
import { ensureAllLocalitiesFetched } from 'dataModules/localityService/higherOrderComponents'
import { ALL, CONTINENT, COUNTRY, DISTRICT, PROVINCE } from '../../constants'
import { actionCreators, globalSelectors } from '../../keyObjectModule'
import localitySelectors from '../../globalSelectors'

const propTypes = {
  allLocalitiesFetched: PropTypes.bool.isRequired,
  group: PropTypes.oneOf([ALL, CONTINENT, COUNTRY, DISTRICT, PROVINCE])
    .isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  updateSearchQuery: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  updateSearchQuery:
    actionCreators.set['localityDropdown.:identifier.searchQuery'],
}

class LocalityDropdownSearch extends Component {
  render() {
    const {
      allLocalitiesFetched,
      group,
      input,
      updateSearchQuery,
      ...rest
    } = this.props

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

    if (!allLocalitiesFetched && !config.isTest) {
      return null
    }
    const leftIconButton = <Button icon="user" />

    return (
      <DropdownSearch
        {...rest}
        getOptions={getDropdownOptions}
        getSearchQuery={state => {
          return globalSelectors.get[
            'localityDropdown.:identifier.searchQuery'
          ](state, {
            identifier: group,
          })
        }}
        getSelectedOption={localitySelectors.getCuratedLocalityOption}
        input={input}
        onSearchChange={({ searchQuery }) => {
          updateSearchQuery(group, searchQuery)
        }}
        rightIconButton={leftIconButton}
        type="dropdown-search-connect"
      />
    )
  }
}

LocalityDropdownSearch.propTypes = propTypes

export default compose(
  connect(null, mapDispatchToProps),
  ensureAllLocalitiesFetched()
)(LocalityDropdownSearch)
