import React from 'react'
import PropTypes from 'prop-types'
import objectPath from 'object-path'

const propTypes = {
  item: PropTypes.object,
  nestedItem: PropTypes.object,
}
const defaultProps = {
  item: undefined,
  nestedItem: undefined,
}

const DefaultItemTitle = ({ item, nestedItem }) => {
  const name =
    objectPath.get(item, 'attributes.name') ||
    objectPath.get(nestedItem, 'name')
  const group =
    objectPath.get(item, 'attributes.group') ||
    objectPath.get(nestedItem, 'group')

  return (
    <span>
      <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>{name}</span>
      {group && <span>({group})</span>}
    </span>
  )
}

DefaultItemTitle.propTypes = propTypes
DefaultItemTitle.defaultProps = defaultProps

export default DefaultItemTitle
