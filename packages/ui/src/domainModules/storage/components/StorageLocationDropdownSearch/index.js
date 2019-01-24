import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropdownSearch } from 'coreModules/form/components'

const propTypes = {
  excludeRootNode: PropTypes.bool,
}

const defaultProps = {
  excludeRootNode: true,
}

class StorageLocationDropdownSearch extends Component {
  render() {
    const { ...rest } = this.props
    return (
      <DropdownSearch
        {...rest}
        resource="storageLocation"
        type="dropdown-search-resource"
      />
    )
  }
}

StorageLocationDropdownSearch.propTypes = propTypes
StorageLocationDropdownSearch.defaultProps = defaultProps

export default StorageLocationDropdownSearch
