import React, { Component } from 'react'
import { DropdownSearch } from 'coreModules/form/components'

const extractText = nestedItem => {
  const { attributes = {} } = nestedItem
  const name = attributes && attributes.name
  if (!name) {
    return ''
  }

  return `${attributes.name} (${attributes.group})`
}

class LocalityDropdownSearch extends Component {
  render() {
    const { ...rest } = this.props
    return (
      <DropdownSearch
        {...rest}
        extractText={extractText}
        icon="search"
        resource="place"
        type="dropdown-search-resource"
      />
    )
  }
}

export default LocalityDropdownSearch
