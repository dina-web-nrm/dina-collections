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
    <React.Fragment>
      <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>
        {fullName}
      </span>
      ({agentType})
    </React.Fragment>
  )
}

ItemTitle.propTypes = propTypes

export default ItemTitle
