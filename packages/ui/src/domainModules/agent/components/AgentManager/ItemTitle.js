import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  nestedItem: PropTypes.object.isRequired,
}

const ItemTitle = ({ nestedItem }) => {
  const { agentType, fullName } = nestedItem
  if (!fullName) {
    return ''
  }

  return (
    <span>
      <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>
        {fullName}
      </span>
      <span>({agentType})</span>
    </span>
  )
}

ItemTitle.propTypes = propTypes

export default ItemTitle
