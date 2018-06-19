import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired,
}
const DefaultWrapper = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>
}

DefaultWrapper.propTypes = propTypes

export default DefaultWrapper
