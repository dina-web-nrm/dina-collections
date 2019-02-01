import React, { Component } from 'react'
import { DropdownSearch } from 'coreModules/form/components'
import { LEVEL_ROOM } from '../../constants'

const include = ['parent.parent.parent.parent.parent']
const relationships = [
  'parent',
  'parent.parent',
  'parent.parent.parent',
  'parent.parent.parent.parent',
  'parent.parent.parent.parent.parent',
]
const resolveRelationships = ['storageLocation']

const getFirstLevelParent = item => {
  const { parent } = item
  if (!parent) {
    return ''
  }

  if (parent.group === LEVEL_ROOM) {
    return parent.name
  }
  return getFirstLevelParent(parent)
}

const extractText = nestedItem => {
  if (!nestedItem) {
    return ''
  }

  const { group, name } = nestedItem
  if (group === LEVEL_ROOM) {
    return nestedItem.name
  }

  const parentName = getFirstLevelParent(nestedItem)
  return `${name} [${group} in ${parentName}]`
}

class StorageLocationDropdownSearch extends Component {
  render() {
    const { ...rest } = this.props
    return (
      <DropdownSearch
        {...rest}
        extractText={extractText}
        include={include}
        nestItems
        relationships={relationships}
        resolveRelationships={resolveRelationships}
        resource="storageLocation"
        type="dropdown-search-resource"
      />
    )
  }
}

export default StorageLocationDropdownSearch
