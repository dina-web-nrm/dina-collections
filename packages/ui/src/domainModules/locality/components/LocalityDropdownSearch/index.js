import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropdownSearch } from 'coreModules/form/components'

const include = ['parent']
const resolveRelationships = ['place']

const extractText = nestedItem => {
  if (!nestedItem) {
    return ''
  }

  const { name, group, parent } = nestedItem
  if (!parent) {
    return `${name} [${group}]`
  }

  return `${name} [${group} in ${parent.name}]`
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
        include={include}
        nestItems
        relationships={include}
        resolveRelationships={resolveRelationships}
        resource="place"
        type="dropdown-search-resource"
      />
    )
  }
}

LocalityDropdownSearch.propTypes = propTypes
LocalityDropdownSearch.defaultProps = defaultProps

export default LocalityDropdownSearch
