import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  item: PropTypes.object.isRequired,
}

const ItemTitle = ({ item = {} }) => {
  const {
    attributes: { group, name },
    relationships: { parent: { name: parentName, isRoot: parentIsRoot } = {} },
  } = item

  if (!name) {
    return ''
  }

  if (parentName && !parentIsRoot) {
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
