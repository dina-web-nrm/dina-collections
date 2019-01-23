import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropdownSearch } from 'coreModules/form/components'

const extractText = nestedItem => {
  const { attributes = {} } = nestedItem
  const name = attributes && attributes.name
  if (!name) {
    return ''
  }

  return `${attributes.name} (${attributes.group})`
}

const propTypes = {
  excludeRootNode: PropTypes.bool,
}

const defaultProps = {
  excludeRootNode: true,
}

class LocalityDropdownSearch extends Component {
  render() {
    const { excludeRootNode, ...rest } = this.props
    return (
      <DropdownSearch
        {...rest}
        excludeRootNode={excludeRootNode}
        extractText={extractText}
        resource="place"
        type="dropdown-search-resource"
      />
    )
  }
}

LocalityDropdownSearch.propTypes = propTypes
LocalityDropdownSearch.defaultProps = defaultProps

export default LocalityDropdownSearch
