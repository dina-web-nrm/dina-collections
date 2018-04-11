import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import config from 'config'
import { DropdownSearch } from 'coreModules/form/components'
import { ensureAllStorageLocationsFetched } from 'dataModules/storageService/higherOrderComponents'
import { ALL, GROUP_1, GROUP_2, GROUP_3, GROUP_4 } from '../../constants'
import {
  actionCreators,
  globalSelectors as keyObjectSelectors,
} from '../../keyObjectModule'
import globalSelectors from '../../globalSelectors'

const mapDispatchToProps = {
  updateStorageSearchQuery: actionCreators.set['search.searchQuery'],
}

const propTypes = {
  allStorageLocationsFetched: PropTypes.bool.isRequired,
  group: PropTypes.oneOf([ALL, GROUP_1, GROUP_2, GROUP_3, GROUP_4]).isRequired,
  updateStorageSearchQuery: PropTypes.func.isRequired,
}

class StorageLocationDropdownSearch extends Component {
  render() {
    const {
      allStorageLocationsFetched,
      group,
      updateStorageSearchQuery,
      ...rest
    } = this.props

    if (!allStorageLocationsFetched && !config.isTest) {
      return null
    }

    let getDropdownOptions
    switch (group) {
      case ALL: {
        getDropdownOptions = globalSelectors.getDropdownAllOptions
        break
      }
      case GROUP_1: {
        getDropdownOptions = globalSelectors.getDropdownGroup1Options
        break
      }
      case GROUP_2: {
        getDropdownOptions = globalSelectors.getDropdownGroup2Options
        break
      }
      case GROUP_3: {
        getDropdownOptions = globalSelectors.getDropdownGroup3Options
        break
      }
      case GROUP_4: {
        getDropdownOptions = globalSelectors.getDropdownGroup4Options
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
        getSearchQuery={keyObjectSelectors.get['search.searchQuery']}
        getSelectedOption={globalSelectors.getStorageLocationOption}
        onSearchChange={({ searchQuery }) =>
          updateStorageSearchQuery(searchQuery)
        }
        type="dropdown-search-connect"
      />
    )
  }
}

StorageLocationDropdownSearch.propTypes = propTypes

export default compose(
  ensureAllStorageLocationsFetched(),
  connect(undefined, mapDispatchToProps)
)(StorageLocationDropdownSearch)
