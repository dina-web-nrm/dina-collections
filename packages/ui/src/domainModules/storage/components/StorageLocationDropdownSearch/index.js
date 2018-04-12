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
  showParentName: PropTypes.bool,
  updateStorageSearchQuery: PropTypes.func.isRequired,
}
const defaultProps = {
  showParentName: false,
}

class StorageLocationDropdownSearch extends Component {
  render() {
    const {
      allStorageLocationsFetched,
      group,
      showParentName,
      updateStorageSearchQuery,
      ...rest
    } = this.props

    if (!allStorageLocationsFetched && !config.isTest) {
      return null
    }

    let getDropdownOptions
    switch (group) {
      case ALL: {
        getDropdownOptions = globalSelectors.createGetDropdownAllOptions({
          showParentName,
        })
        break
      }
      case GROUP_1: {
        getDropdownOptions = globalSelectors.createGetDropdownGroup1Options({
          showParentName,
        })
        break
      }
      case GROUP_2: {
        getDropdownOptions = globalSelectors.createGetDropdownGroup2Options({
          showParentName,
        })
        break
      }
      case GROUP_3: {
        getDropdownOptions = globalSelectors.createGetDropdownGroup3Options({
          showParentName,
        })
        break
      }
      case GROUP_4: {
        getDropdownOptions = globalSelectors.createGetDropdownGroup4Options({
          showParentName,
        })
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
StorageLocationDropdownSearch.defaultProps = defaultProps

export default compose(
  ensureAllStorageLocationsFetched(),
  connect(undefined, mapDispatchToProps)
)(StorageLocationDropdownSearch)
