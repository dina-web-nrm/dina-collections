import React, { Component } from 'react'
import { DropdownSearch } from 'coreModules/form/components'

class StorageLocationDropdownSearch extends Component {
  render() {
    const { ...rest } = this.props
    return (
      <DropdownSearch
        {...rest}
        resource="taxonName"
        type="dropdown-search-resource"
      />
    )
  }
}

export default StorageLocationDropdownSearch
