import React, { Component } from 'react'
import { DropdownSearch } from 'coreModules/form/components'

class LocalityDropdownSearch extends Component {
  render() {
    const { ...rest } = this.props
    return (
      <DropdownSearch
        {...rest}
        resource="place"
        type="dropdown-search-resource"
      />
    )
  }
}

export default LocalityDropdownSearch
