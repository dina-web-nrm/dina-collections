import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired,
}
const DefaultWrapper = ({ children }) => {
  return <div style={{ minHeight: '100vh' }}>{children}</div>
}

DefaultWrapper.propTypes = propTypes

export default DefaultWrapper
