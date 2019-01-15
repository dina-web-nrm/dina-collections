import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  nestedItem: PropTypes.object.isRequired,
}

const ItemTitle = ({ nestedItem }) => {
  const { group, name, parent: { name: parentName } } = nestedItem
  if (!name) {
    return ''
  }

  if (parentName !== 'root') {
    return (
      <React.Fragment>
        <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>{name}</span>
        <span>
          [{group} in {parentName}]
        </span>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>{name}</span>
      <span>[{group}]</span>
    </React.Fragment>
  )
}

ItemTitle.propTypes = propTypes

export default ItemTitle
