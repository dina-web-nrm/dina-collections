import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Search } from 'coreModules/form/components'
import globalSelectors from '../../globalSelectors'
import {
  actionCreators,
  globalSelectors as keyObjectSelectors,
} from '../../keyObjectModule'

const mapDispatchToProps = {
  updateStorageSearchQuery: actionCreators.set['search.searchQuery'],
}

const propTypes = {
  updateStorageSearchQuery: PropTypes.func.isRequired,
}

class StorageLocationSearch extends Component {
  render() {
    const { updateStorageSearchQuery, ...rest } = this.props

    return (
      <Search
        getOptions={globalSelectors.getStorageDropdownOptions}
        getSearchLoading={keyObjectSelectors.get['search.loading']}
        getSearchQuery={keyObjectSelectors.get['search.searchQuery']}
        getSelectedOption={globalSelectors.getStorageLocationOption}
        onSearchChange={({ searchQuery }) =>
          updateStorageSearchQuery(searchQuery)
        }
        {...rest}
        type="search-connect"
      />
    )
  }
}

StorageLocationSearch.propTypes = propTypes

export default connect(undefined, mapDispatchToProps)(StorageLocationSearch)
