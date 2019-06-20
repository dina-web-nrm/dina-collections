import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  item: PropTypes.object.isRequired,
}

const ItemTitle = ({ item = {} }) => {
  const {
    attributes: { agentType, fullName },
  } = item

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
